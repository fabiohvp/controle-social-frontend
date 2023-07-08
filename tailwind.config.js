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
        "gray-light": "#d1d5db",
        "gray-medium": "#6b7280",
        "gray-dark": "#4b5563",
        "blue-dark": "#082b54",

        link: "#5486b3",
        negative: "#c0392b",
        positive: "#27ae60",
      },
    },
  },
  plugins: [],
};
