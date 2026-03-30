/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        background: '#0B0B0F',
        card: '#12121A'
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
