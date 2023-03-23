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
          dark: "#A71756",
          light: "#E6007A",
        },
        purple: {
          DEFAULT: "#552BBF",
          dark: "#442299",
          darkMode: "#1C0533",
          light: "#6D3AEE",
        },
        orange: {
          DEFAULT: "#E33B26",
          dark: "#8F1F1D",
          light: "#F58400",
        }
      },
    },
  },
  plugins: [],
};
