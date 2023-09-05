module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    height: {
      '80vh': '80vh',
      '50vh': '50vh',
    },

    letterSpacing: {
      widests: '0.165em',
      widestss: '0.105em',
    },
    fontFamily: {
      'plus-jakarta': 'Plus Jakarta Sans',
      epilogue: 'Epilogue',
    },
    extend: {
      colors: {
        darkPurple: '#635FC7',
        lightPurple: '#A8A4FF',
        darkBlue: '#000112',
        darkGray: '#20212C',
        mediumGray: '#2B2C37',
        lightGray: '#3E3F4E',
        veryLightGray: '#828FA3',
        lightBlueish: '#E4EBFA',
        almostWhite: '#F4F7FD',
        tomatoRed: '#EA5555',
        lightTomatoRed: '#FF9898',
        purple: '#41197F',
        yellowNew: '#FCC436',
        yellowClean: '#FCDC36',
      },
    },
  },
  plugins: [],
};
