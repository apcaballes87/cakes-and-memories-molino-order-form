/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EC5685',
        primaryLight: '#F377BD',
        teal: '#33BECB',
        tealDark: '#20C6BC',
        grayText: '#BCBCBC',
        grayDark: '#8C8C8C',
        lightBg: '#FEF8FA'
      },
      borderRadius: {
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}