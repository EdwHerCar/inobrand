/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Azonix', 'Nunito', 'sans-serif'],
        body: ['Nunito', 'Roboto', 'sans-serif'],
        sans: ['Nunito', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#3A29F2',
        secondary: '#BD29F2',
        tertiary: '#7D29F2',
        accent: '#4971F5',
        highlight: '#F229DB',
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-text': '#FFFFFF',
        'dark-muted': '#9CA3AF',
        'light-bg': '#FFFFFF',
        'light-surface': '#F3F4F6',
        'light-text': '#1F2937',
        'light-muted': '#6B7280'
      },
    },
  },
  plugins: [],
}

