/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A29F2',
        secondary: '#BD29F2',
        tertiary: '#7D29F2',
        accent: '#4971F5',
        highlight: '#F229DB',
        dark: {
          bg: '#121212',
          surface: '#1E1E1E',
          text: '#FFFFFF',
          muted: '#9CA3AF'
        },
        light: {
          bg: '#FFFFFF',
          surface: '#F3F4F6',
          text: '#1F2937',
          muted: '#6B7280'
        }
      },
    },
  },
  plugins: [],
}