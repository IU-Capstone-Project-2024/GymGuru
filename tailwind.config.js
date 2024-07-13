/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/templates/*", "./app/static/css/*"],
  theme: {
    extend: {
      colors: {
        custom_blue: '#BCC5D6',
        custom_light_blue: '#D3E9FF',
        custom_dark_blue:'#0F316C',
      },
    },
  },
  plugins: [],
}

