/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './dist/*.html',
    './client/src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [],
  theme: {
    screens: {
      sm: '640px',
      md: '800px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'primary': {
          100: '#e5f4ff',
          200: '#c8e8ff',
          300: '#a4d8ff',
        },
        'secondary': {
          100: '#110029',
          200: '#300e7f',
          300: '#6120d8',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderWidth: {
        '1': '1px',
        '3': '3px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
