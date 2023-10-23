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
      fontSize:{
        13:"13px",
        15:"15px"
      },
      border:{
      1:"1px"
      },
      boxShadow:{
        'custom': "0 0 0 1px rgba(0,10,30,.2)",
        'border':"0 -1px 0 0 rgba(0,10,30,.2)"
      }
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
        strong_blue:"#0078c8",
        hover_blue:"#006db7",
        white:"#ffffff",
        purple: '#3f3cbb',
        midnight: '#121063',
        metal: '#565584',
        tahiti: '#3ab7bf',
        silver: '#ecebff',
        bermuda: '#78dcca',
        blue:{
          900:"#831843"
        },
        nav_color: "#0078c8",
        hoverColor: "#005795",
        userBgColor: '#fdd580',
        deep_gray: "#000a1ebf",
        navy_blue:"#0078c8",
        light_blue: "#f2f3f4",
        plum:"#daa3e4",
        light_blue: "#f2f3f4",
        table_border:"#000a1e33",
        blue_charcoal: "#000A1E",
        spanish_green: "#00823c",
        gray_color: "#999797",
        success_color: "#e4eff7"
    },


  },
  plugins: [],

}

