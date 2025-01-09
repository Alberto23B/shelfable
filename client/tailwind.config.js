/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "cream": {
          "100": "#f2e9e4",
          "200": "#f2e3da",
        },
        "verdigris": "#2FAEB7",
        "robin": "#6BC4CD",
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
