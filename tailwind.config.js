/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      '2xl': { max: '2000px' },
      xl: { max: '1500px' },
      lg: { max: '985px' },
      md: { max: '889px' },
      sm: { max: '519px' },
      xs: { max: '459px' },
      '2xs': { max: '401px' },
    },
    extend: {},
  },
  plugins: [],
}