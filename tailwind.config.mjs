import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',  // Azul muy claro
          100: '#bae7ff', // Azul claro
          200: '#91d5ff', // Azul medio claro
          300: '#69c0ff', // Azul medio
          400: '#40a9ff', // Azul estándar
          500: '#1890ff', // Azul principal (como en los mockups)
          600: '#096dd9', // Azul oscuro
          700: '#0050b3', // Azul muy oscuro
          800: '#003a8c', // Azul extremadamente oscuro
          900: '#002766', // Azul casi negro
          950: '#001a4d', // Azul casi negro más profundo
        },
        secondary: {
          50: '#e6fffb',  // Verde azulado muy claro
          100: '#b5f5ec', // Verde azulado claro
          200: '#87e8de', // Verde azulado medio claro
          300: '#5cdbd3', // Verde azulado medio
          400: '#36cfc9', // Verde azulado estándar
          500: '#13c2c2', // Verde azulado principal (como en los mockups)
          600: '#08979c', // Verde azulado oscuro
          700: '#006d75', // Verde azulado muy oscuro
          800: '#00474f', // Verde azulado extremadamente oscuro
          900: '#002329', // Verde azulado casi negro
        },
        picoGreen: '#13c2c2', // Verde azulado del logo (actualizado según mockups)
        picoBlue: '#1890ff',  // Azul del logo (actualizado según mockups)
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
        '3xl': '3rem',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
