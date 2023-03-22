/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      unbounded: ["Unbounded", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        green: {
          DEFAULT: "#24CC85",
          dark: "#253C32",
          light: "#a5d4c0",
        },
        pink: {
          DEFAULT: "#E6007A",
          dark: "#E6007A",
          light: "#E6007A",
        },
      },
    },
  },
  plugins: [],
};
