/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily:{
      main:['Poppins', 'sans-serif']
    },
    extend: {
      width:{
        main:'1220px'
      },
      backgroundColor:{
        main:'#ee3131'
      },
      colors:{
        main:'#ee3131'
      },
      flex:{
        '2':'2 2 0%',
        '3':'3 3 0%',
        '4':'4 4 0%',
        '5':'5 5 0%',
        '6':'6 6 0%',
        '7':'7 7 0%',
        '8':'8 8 0%',
      },
      keyframes:{
        'slide-top':{
          '0%' : {
              '-webkit-transform': 'translateY(20px)',
              transform: 'translateY(20px)'
          },
          '100%' : {
              '-webkit-transform': 'translateY(0)',
              transform: 'translateY(0)'
          }
        },
        'slide-left':{
          '0%' : {
              '-webkit-transform': 'translateX(100px)',
              transform: 'translateX(100px)'
          },
          '100%' : {
              '-webkit-transform': 'translateX(0)',
              transform: 'translateX(0)'
          }
        },
        'rotate-center':{
          '0%' : {
              '-webkit-transform': 'rotate(0)',
              transform: 'rotate(0)'
          },
          '100%' : {
              '-webkit-transform': 'rotate(360deg)',
              transform: 'rotate(360deg)'
          }
        },
        'rotate-0-180':{
          '0%' : {
              '-webkit-transform': 'rotate(0)',
              transform: 'rotate(0)'
          },
          '100%' : {
              '-webkit-transform': 'rotate(180deg)',
              transform: 'rotate(180deg)'
          }
        },
        'rotate-180-360':{
          '0%' : {
              '-webkit-transform': 'rotate(180deg)',
              transform: 'rotate(180deg)'
          },
          '100%' : {
              '-webkit-transform': 'rotate(360deg)',
              transform: 'rotate(360deg)'
          }
        },
        'opacity-show':{
          '0%' : {
              opacity: 0
          },
          '50%' : {
            opacity: 0.7
          },
          '100%' : {
              opacity: 1
          }
        },
        'scale-up-ver-top':{
          '0%' : {
            '-webkit-transform': 'scaleY(0.4)',
            transform: 'scaleY(0.4)',
            '-webkit-transform-origin': '100% 0%',
            'transform-origin': '100% 0%',
          },
          '100%' : {
            '-webkit-transform': 'scaleY(1)',
            transform: 'scaleY(1)',
            '-webkit-transform-origin': '100% 0%',
            'transform-origin': '100% 0%',
          }
        },
        'scale-up-ver-bottom':{
          '0%' : {
            '-webkit-transform': 'scaleY(0.8)',
            transform: 'scaleY(0.8)',
            '-webkit-transform-origin': '100% 0%',
            'transform-origin': '100% 0%',
          },
          '100%' : {
            '-webkit-transform': 'scaleY(0)',
            transform: 'scaleY(0)',
            '-webkit-transform-origin': '100% 0%',
            'transform-origin': '100% 0%',
          }
        },
      },
      animation:{
        'slide-top' : 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left' : 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center' : 'rotate-center 0.5s ease-in-out both;',
        'rotate-0-180' : 'rotate-0-180 0.5s ease-in-out both;',
        'rotate-180-360' : 'rotate-180-360 0.5s ease-in-out both;',
        'opacity-show' : 'opacity-show 0.7s ease-in-out both;',
        'scale-up-ver-top' : 'scale-up-ver-top 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
        'scale-up-ver-bottom' : 'scale-up-ver-bottom 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;'
      }
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}