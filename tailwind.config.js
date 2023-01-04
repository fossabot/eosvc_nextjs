/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.js",
    "./pages/**/*.ts",
    "./pages/**/*.jsx",
    "./pages/**/*.tsx",
    "./modules/**/*.js",
    "./modules/**/*.jsx",
    "./modules/**/*.ts",
    "./modules/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.ts",
    "./components/**/*.jsx",
    "./components/**/*.tsx",
    "./components/**/**/*.js",
    "./components/**/**/*.ts",
    "./components/**/**/*.jsx",
    "./components/**/**/*.tsx",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./layout/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
