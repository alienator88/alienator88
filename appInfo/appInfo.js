document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const appId = params.get("id");
  const loading = document.getElementById("loading");
  const appContent = document.getElementById("appContent");

  if (!appId) {
    showError("No app ID provided");
    return;
  }

  fetch("../appslist.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch app data");
      }
      return response.json();
    })
    .then((apps) => {
      const app = apps.find((app) => app.id.toString() === appId);
      if (!app) {
        showError("App not found");
        return;
      }

      populateAppData(app);

      // Hide loading and show content
      setTimeout(() => {
        loading.style.display = "none";
        appContent.style.opacity = "1";
      }, 500);
    })
    .catch((error) => {
      console.error("Error loading app data:", error);
      showError("Failed to load app information");
    });
});

function populateAppData(app) {
  // Update page title and meta
  document.title = `${app.title} - Alin Lupascu`;

  // Populate basic app info
  const elements = {
    appImage: app.image,
    appTitle: app.title,
    appDescription: app.description,
  };

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) {
      if (id === "appImage") {
        element.src = value;
        element.alt = `${app.title} Icon`;
      } else {
        element.textContent = value;
      }
    }
  });

  // Set up download and repo links
  const downloadBtn = document.getElementById("download_url");
  const repoBtn = document.getElementById("repo_url");

  if (downloadBtn && app.download_url) {
    downloadBtn.href = app.download_url;
  }

  if (repoBtn && app.repo_url) {
    repoBtn.href = app.repo_url;
  }

  // Handle Homebrew installation
  setupHomebrewSection(app);

  // Handle screenshots
  setupScreenshots(app);

  // Fetch dynamic data
  fetchAppMetadata(app);
}

function setupHomebrewSection(app) {
  const brewContainer = document.getElementById("brewContainer");
  const brewCode = document.getElementById("brew");

  if (app.brew && brewCode) {
    brewCode.textContent = app.brew;
  } else if (brewContainer) {
    brewContainer.style.display = "none";
  }
}

function setupScreenshots(app) {
  const screenshots = ["screenshot1", "screenshot2"];

  screenshots.forEach((screenshotId) => {
    const img = document.getElementById(screenshotId);
    const container = document.getElementById(`${screenshotId}Container`);

    if (app[screenshotId] && img) {
      img.src = app[screenshotId];
      img.alt = `${app.title} Screenshot`;
    } else if (container) {
      container.style.display = "none";
    }
  });
}

function fetchAppMetadata(app) {
  // Fetch latest release version
  fetchLatestRelease(app.title)
    .then((version) => {
      const versionElement = document.getElementById("appVersion");
      if (versionElement) {
        versionElement.innerHTML = `<i class="fas fa-tag mr-2"></i>Latest: ${version}`;
        versionElement.classList.add("animate-fade-in");
      }
    })
    .catch((error) => {
      console.error(`Error fetching release version for ${app.title}:`, error);
      const versionElement = document.getElementById("appVersion");
      if (versionElement) {
        versionElement.style.display = "none";
      }
    });

  // Fetch download counts
  getTotalDownloads("alienator88", app.id)
    .then((totalDownloads) => {
      const downloadsElement = document.getElementById("appDownloads");
      if (downloadsElement) {
        downloadsElement.innerHTML = `<i class="fas fa-download mr-2"></i>Downloads: ${totalDownloads}`;
        downloadsElement.classList.add("animate-fade-in");
      }
    })
    .catch((error) => {
      console.error(`Error fetching downloads for ${app.title}:`, error);
      const downloadsElement = document.getElementById("appDownloads");
      if (downloadsElement) {
        downloadsElement.style.display = "none";
      }
    });
}

function fetchLatestRelease(repoName) {
  const url = `https://api.github.com/repos/alienator88/${repoName}/releases/latest`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data.tag_name)
    .catch((error) => {
      console.error("Error fetching the latest release:", error);
      throw error;
    });
}

async function getTotalDownloads(repoOwner, repoName) {
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const releases = await response.json();
    let totalDownloads = 0;

    releases.forEach((release) => {
      release.assets.forEach((asset) => {
        totalDownloads += asset.download_count;
      });
    });

    return totalDownloads.toLocaleString();
  } catch (error) {
    console.error("Error fetching release data:", error);
    throw error;
  }
}

function copyToClipboard() {
  const codeElement = document.querySelector("#brew");
  if (!codeElement) return;

  // Use modern clipboard API if available
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(codeElement.textContent)
      .then(() => showCopySuccess())
      .catch(() => fallbackCopyToClipboard(codeElement.textContent));
  } else {
    fallbackCopyToClipboard(codeElement.textContent);
  }
}

function fallbackCopyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    showCopySuccess();
  } catch (err) {
    console.error("Fallback copy failed:", err);
    showCopyError();
  }

  document.body.removeChild(textarea);
}

function showCopySuccess() {
  const copyBtn = document.getElementById("copy-btn");
  if (!copyBtn) return;

  const icon = copyBtn.querySelector("i");
  const originalClass = icon.className;

  // Change to check icon
  icon.className = "fas fa-check text-green-500";
  copyBtn.classList.add("bg-green-100", "dark:bg-green-900/30");
  copyBtn.classList.remove("bg-gray-100", "dark:bg-gray-700");

  // Revert after 2 seconds
  setTimeout(() => {
    icon.className = originalClass;
    copyBtn.classList.remove("bg-green-100", "dark:bg-green-900/30");
    copyBtn.classList.add("bg-gray-100", "dark:bg-gray-700");
  }, 2000);
}

function showCopyError() {
  const copyBtn = document.getElementById("copy-btn");
  if (!copyBtn) return;

  const icon = copyBtn.querySelector("i");
  const originalClass = icon.className;

  // Change to error icon
  icon.className = "fas fa-exclamation-triangle text-red-500";
  copyBtn.classList.add("bg-red-100", "dark:bg-red-900/30");
  copyBtn.classList.remove("bg-gray-100", "dark:bg-gray-700");

  // Revert after 2 seconds
  setTimeout(() => {
    icon.className = originalClass;
    copyBtn.classList.remove("bg-red-100", "dark:bg-red-900/30");
    copyBtn.classList.add("bg-gray-100", "dark:bg-gray-700");
  }, 2000);
}

function showError(message) {
  const loading = document.getElementById("loading");
  if (loading) {
    loading.innerHTML = `
      <div class="text-center space-y-4">
        <div class="text-red-500 dark:text-red-400 mb-4">
          <i class="fas fa-exclamation-triangle text-3xl"></i>
        </div>
        <p class="text-gray-600 dark:text-gray-400 font-medium">${message}</p>
        <button
          onclick="window.history.back()"
          class="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Go Back
        </button>
      </div>
    `;
  }
}
