/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './App.tsx',
    './types.ts',
    './constants.ts',
  ],
  theme: {
    extend: {
      colors: {
        bohem: {
          gold: '#c5a065',
          dark: '#43302b',
          text: '#5d4e46',
          light: '#fdfbf7',
          paper: '#f4f0e6',
          stone: '#eaddcf',
          border: '#d6cbbd',
        },
      },
      fontFamily: {
        serif: ['"Gilda Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
