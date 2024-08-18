/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'gimi': '#C2F915',
     'bli':'#03003A'
    },
    extend: {
      fontFamily: {
        custom: ['Inter', 'sans-serif'], // Replace 'YourFontName' with the name of your custom font
      },
    },
  },
  plugins: [],
}
