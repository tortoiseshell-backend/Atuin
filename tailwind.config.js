/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './dist/*.html',
    './client/src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
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
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
