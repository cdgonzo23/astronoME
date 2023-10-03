/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'darkest': '#0D1018',
        'div-gray': '#2C2B30',
        'hover-blue': '#3E546F',
        'galaxy-red': '#784037'
      },
      fontFamily: {
        'body': ['Nunito'],
        'heading': ['Jura'],
      }
    }
  },
  plugins: [],
}

