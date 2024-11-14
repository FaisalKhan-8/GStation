/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#29B675',
        primarybg: '#559B7B',
      },
      fontFamily: {
        nunito: 'Nunito Regular',
        suse: 'SUSE Regular',
      },
    },
  },
  plugins: [],
};
