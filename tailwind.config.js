/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customColor:"#306894",
        customSecondary: '##ece9e4'
      }
    },
  },
  plugins: [],
}
