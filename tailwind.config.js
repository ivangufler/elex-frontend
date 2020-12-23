module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgc: '#094f1d',
        primary: '#91c418',
        secondary: {
          100: '#bababa',
          200: '#7d7d7d'
        }
      },
      fontFamily: {
        cfont: ['Poppins']
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  },
  plugins: [],
}
