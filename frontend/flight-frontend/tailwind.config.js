/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f8ff',
          100: '#dcecff',
          200: '#beddff',
          300: '#91c5ff',
          400: '#5aa2ff',
          500: '#2f7df6',
          600: '#1f62d8',
          700: '#1b4eaf',
          800: '#1a438f',
          900: '#1b3a74',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 10px 40px rgba(47, 125, 246, 0.28)',
      },
    },
  },
  plugins: [],
}

