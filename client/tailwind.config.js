/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js, ts, jsx, tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      keyframes: {
        resizeTitle: {
          "0%": { fontSize: "6rem" },
          "100%": { fontSize: "3rem" },
        },
      },
      animation: {
        resizeTitle: "resizeTitle 1.2s ease-in-out forwards",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "cream": {
          "100": "#f2e9e4",
          "200": "#f2e3da",
        },
        "teak": "#C9ADA7",
        "pearl": "#98685D",
        "iron": "#4A4E69",
        "cadet": "#22223B",
        "cool": "#11111D",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        lcd: "Libre Caslon Display",
      },
      minWidth: {
        "1/2": "50%",
      },
    },
  },
  plugins: ["@tailwindcss/line-clamp"],
};
