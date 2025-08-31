/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C6A969',
        ink: '#0A0A0A',
        bone: '#F8F7F3'
      },
      boxShadow: {
        luxury: '0 10px 30px rgba(0,0,0,0.25)'
      },
      dropShadow: {
        luxury: '0 4px 12px rgba(198,169,105,0.6)'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        }
      },
      animation: {
        'fade-in': 'fade-in 700ms ease-out both'
      }
    }
  },
  plugins: []
}
