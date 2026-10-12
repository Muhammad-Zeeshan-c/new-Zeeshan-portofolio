/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B4D8',
          50: '#e6f8fc',
          100: '#cceffa',
          200: '#99e0f4',
          300: '#66d0ef',
          400: '#33c0e9',
          500: '#00B4D8',
          600: '#0090ad',
          700: '#006c82',
          800: '#004856',
          900: '#00242b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        moderniz: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        cascadia: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        bauhaus: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
