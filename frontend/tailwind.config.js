/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shake': {
          '0%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-5px)' },
          '30%': { transform: 'translateX(5px)' },
          '50%': { transform: 'translateX(-3px)' },
          '70%': { transform: 'translateX(3px)' },
          '90%': { transform: 'translateX(-1px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'shake': 'shake 0.5s',
      },
    },
    },

  plugins: [],
}