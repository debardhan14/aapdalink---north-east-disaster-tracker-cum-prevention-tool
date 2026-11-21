/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070D1B',
          900: '#0A1329',
          800: '#101F42',
          700: '#182C5E',
          600: '#233F85',
        },
        emergency: {
          red: '#DC2626',
          'red-dark': '#991B1B',
          'red-light': '#FEE2E2',
          orange: '#EA580C',
          'orange-dark': '#C2410C',
          'orange-light': '#FFEDD5',
          amber: '#D97706',
          'amber-light': '#FEF3C7',
          green: '#16A34A',
          'green-light': '#DCFCE7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'emergency': '0 4px 14px 0 rgba(220, 38, 38, 0.39)',
        'warning': '0 4px 14px 0 rgba(234, 88, 12, 0.35)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
