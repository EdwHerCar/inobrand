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
        // Variantes profundas: mismo tono de marca, oscurecidas hasta que el texto
        // blanco alcanza contraste AA (>=4.5:1). Las versiones base se quedan
        // cortas sobre texto de cuerpo: highlight 3.43:1, accent 4.23:1,
        // secondary 4.41:1. Úsalas como fondo cuando encima vaya texto blanco.
        'primary-deep': '#3A29F2',
        'secondary-deep': '#AE0EE7',
        'tertiary-deep': '#7D29F2',
        'accent-deep': '#315EF4',
        'highlight-deep': '#C30CAE',
        // Violeta claro para acentos sobre fondo oscuro (6.3:1 sobre #1B1B22);
        // el violeta de marca sólo llega a 2.8:1 y resulta ilegible.
        'accent-soft': '#A78BFA',
        // Tintes claros para TEXTO sobre superficies oscuras (>=4.5:1 sobre
        // #191919). Los tonos base fallan como texto en oscuro: primary 2.33:1,
        // tertiary 2.91:1. Usar *-deep para fondos, *-lite para texto en oscuro.
        'primary-lite': '#7A6FF6',
        'accent-lite': '#5379F6',
        'tertiary-lite': '#9F60F5',
        'secondary-lite': '#C441F3',
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-text': '#FFFFFF',
        'dark-muted': '#9CA3AF',
        'light-bg': '#FFFFFF',
        'light-surface': '#F3F4F6',
        'light-text': '#1F2937',
        'light-muted': '#6B7280'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'equalize': {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        // Desplaza un gradiente sobredimensionado: da sensación de aurora viva
        'aurora': {
          '0%, 100%': { transform: 'translate(-8%, -4%) scale(1.1)' },
          '50%': { transform: 'translate(8%, 4%) scale(1.25)' },
        },
        // Barrido de brillo que cruza el botón
        'shine': {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(320%) skewX(-20deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'equalize': 'equalize 1.1s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 14s ease-in-out infinite',
        'aurora-slow': 'aurora 20s ease-in-out infinite reverse',
        'shine': 'shine 5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

