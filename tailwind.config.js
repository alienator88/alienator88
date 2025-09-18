/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",
    "./**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // Light mode colors
        'light': {
          'primary': '#ffffff',
          'secondary': '#f5f5f7',
          'tertiary': '#f9f9f9',
          'text': '#1d1d1f',
          'text-secondary': '#86868b',
          'accent': '#0071e3',
          'accent-hover': '#0077ed',
          'border': '#d2d2d7',
        },
        // Dark mode colors (your current theme)
        'dark': {
          'primary': '#000317',
          'secondary': '#000210',
          'tertiary': '#1c1c1e',
          'text': '#ffffff',
          'text-secondary': '#828fa5',
          'accent': '#5d76e5',
          'accent-hover': '#4d62bd',
          'border': '#dddddd1c',
        }
      },
      backgroundImage: {
        'gradient-apple': 'linear-gradient(to left, rgb(74, 0, 139), #5d76e5, #ab5dbb, #5d76e5)',
        'glass-light': 'rgba(255, 255, 255, 0.7)',
        'glass-dark': 'rgba(0, 3, 23, 0.7)',
      },
      backdropBlur: {
        'apple': '20px',
      },
      animation: {
        'gradient-shift': 'gradientAnimation 5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        gradientAnimation: {
          '0%': { 'background-position': '0% 100%' },
          '50%': { 'background-position': '100% 0%' },
          '100%': { 'background-position': '0% 100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'apple': '0 8px 15px rgba(93, 118, 229, 0.3)',
        'apple-hover': '0 12px 25px rgba(93, 118, 229, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
