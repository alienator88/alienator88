// Theme management system
class ThemeManager {
  constructor() {
    this.theme = this.getInitialTheme();
    this.init();
  }

  getInitialTheme() {
    // Check localStorage first
    const saved = localStorage.getItem("theme");
    if (saved && (saved === "light" || saved === "dark")) {
      return saved;
    }

    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  init() {
    // Set initial theme
    this.applyTheme(this.theme);

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem("theme")) {
          this.theme = e.matches ? "dark" : "light";
          this.applyTheme(this.theme);
          this.updateToggleIcon();
        }
      });

    // Add toggle button
    this.createToggleButton();
  }

  applyTheme(theme) {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    this.theme = theme;
  }

  toggle() {
    const newTheme = this.theme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    this.updateToggleIcon();
  }

  createToggleButton() {
    const button = document.createElement("button");
    button.id = "theme-toggle";
    button.className = `
      ml-6 w-8 h-8 rounded-full
      bg-gray-100 dark:bg-gray-800
      hover:bg-gray-200 dark:hover:bg-gray-700
      flex items-center justify-center
      transition-all duration-300 ease-in-out
      hover:scale-110
      focus:outline-none focus:ring-2 focus:ring-blue-500/50
    `
      .replace(/\s+/g, " ")
      .trim();

    button.innerHTML = `
      <svg class="w-4 h-4 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path class="sun-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
        <path class="moon-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    `;

    button.addEventListener("click", () => this.toggle());

    // Add to navigation
    const nav = document.querySelector("nav");
    if (nav) {
      nav.appendChild(button);
    } else {
      document.body.appendChild(button);
    }

    this.updateToggleIcon();
  }

  updateToggleIcon() {
    const button = document.getElementById("theme-toggle");
    if (!button) return;

    const sunIcon = button.querySelector(".sun-icon");
    const moonIcon = button.querySelector(".moon-icon");

    if (this.theme === "dark") {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
      button.style.color = "#ffffff";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
      button.style.color = "#1d1d1f";
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});
