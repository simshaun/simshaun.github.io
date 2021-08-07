const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  purge: ['./src/**/*.njk', './src/**/*.md'],
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '1rem',
      base: '1.2rem',
      lg: '1.25rem',
      xl: '1.4rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2.25rem',
      '5xl': '4rem',
      '6xl': '5rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'color-inherit': 'inherit',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      indigo: colors.indigo,
      primary: colors.blue['700'],
      'primary-contrast': colors.white,
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '920px',
        xl: '920px',
      }
    },
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
