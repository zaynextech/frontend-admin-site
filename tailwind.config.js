/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B8CFF",
        dark: "#0A0A0F",
        softDark: "#111118",
        card: "#15151d",
        borderSoft: "rgba(255,255,255,0.06)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(91,140,255,0.15)"
      },
      // --- Zaynex Brand Loader Additions ---
      animation: {
        'loader-square-1': 'square-1 2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'loader-square-2': 'square-2 2s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        'square-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-6px, -6px) scale(1.1)', borderColor: '#ffffff' },
        },
        'square-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(6px, 6px) scale(1.1)', borderColor: '#06b6d4' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      // -------------------------------------
    },
  },
  plugins: [],
}