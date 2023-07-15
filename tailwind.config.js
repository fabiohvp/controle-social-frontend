//https://tailwindcss.com/docs/configuration#referencing-in-java-script
const COLORS = require("./src/theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-header": "#F8F8F8",
        "menu-active": "#E3E3E3",

        "gray-light": "#d1d5db",
        "gray-medium": "#6b7280",
        "gray-dark": "#4b5563",

        "blue-dark": "#556778",
        "blue-menu": "#364B60",

        link: "#5486b3",

        ...COLORS,
      },
    },
  },
  plugins: [],
};
