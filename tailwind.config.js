/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'dash': 'dash 20s linear infinite',
      },
    },
  },
  plugins: [],
};