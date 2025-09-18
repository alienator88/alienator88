document.addEventListener("DOMContentLoaded", function () {
  const appGrid = document.getElementById("appGrid");
  const loading = document.getElementById("loading");

  fetch("../appslist.json")
    .then((response) => response.json())
    .then((apps) => {
      loading.style.display = "none";

      apps.forEach((app, index) => {
        const item = document.createElement("div");
        item.className = `
          app-card group relative cursor-pointer
          bg-white dark:bg-gray-800/50
          backdrop-blur-sm
          border border-gray-200 dark:border-gray-700/50
          rounded-2xl p-6
          shadow-lg hover:shadow-2xl dark:shadow-gray-900/30
          transition-all duration-300 ease-out
          hover:border-blue-300 dark:hover:border-blue-500/50
          animate-slide-up
        `
          .replace(/\s+/g, " ")
          .trim();

        // Add stagger animation delay
        item.style.animationDelay = `${index * 0.1}s`;

        let badgesHTML = "";
        if (app.badges) {
          const badges = app.badges.split(",");
          badgesHTML = `
            <div class="flex flex-wrap gap-2 mt-4">
              ${badges
                .map(
                  (badge) => `
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                           bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                           border border-gray-200 dark:border-gray-600">
                  ${badge.trim()}
                </span>
              `,
                )
                .join("")}
            </div>
          `;
        }

        item.innerHTML = `
          <div class="flex items-start space-x-4 h-full">
            <!-- App Icon -->
            <div class="relative flex-shrink-0">
              <img
                src="${app.image}"
                alt="${app.title}"
                class="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover
                       shadow-md group-hover:shadow-lg transition-shadow duration-300
                       ring-1 ring-gray-200 dark:ring-gray-600"
              >
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <!-- App Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                ${app.title}
              </h3>
              <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                ${app.description}
              </p>
              ${badgesHTML}
            </div>

            <!-- Arrow Icon -->
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center
                          group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30
                          group-hover:scale-110 transition-all duration-300">
                <i class="fas fa-arrow-right text-sm text-gray-400 dark:text-gray-500
                         group-hover:text-blue-600 dark:group-hover:text-blue-400
                         group-hover:translate-x-0.5 transition-all duration-200"></i>
              </div>
            </div>
          </div>

          <!-- Hover effect overlay -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        `;

        appGrid.appendChild(item);

        // Make the item clickable with enhanced feedback
        item.addEventListener("click", () => {
          // Add click animation
          item.style.transform = "scale(0.98)";
          setTimeout(() => {
            item.style.transform = "";
            window.location.href = `/appInfo?id=${app.id}`;
          }, 100);
        });

        // Add keyboard navigation support
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `View details for ${app.title}`);

        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            item.click();
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error loading the apps data:", error);
      loading.innerHTML = `
        <div class="text-center py-16">
          <div class="text-red-500 dark:text-red-400 mb-4">
            <i class="fas fa-exclamation-triangle text-2xl"></i>
          </div>
          <p class="text-gray-600 dark:text-gray-400">Failed to load apps</p>
          <button
            onclick="location.reload()"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      `;
    });
});
