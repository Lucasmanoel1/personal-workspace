/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // mantive suas cores de marca pra facilitar
        brand: {
          900: "#2C1810",
          700: "#8B4513",
          300: "#D2B48C"
        }
      }
    }
  },
  plugins: [
    require("tailwindcss-animate")
  ],
};
