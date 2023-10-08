/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        'custom': '64px', // You can give it any name you prefer
      },
      
    },
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        red:colors.red,
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        hover_blue:"#006db7",
        nav_color: "#0078c8",
        hoverColor: "#005795",
        userBgColor: '#fdd580'
    },

  },
  plugins: [],

}

