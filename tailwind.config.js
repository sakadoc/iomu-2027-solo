/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        keraton: '#14302B',
        emerald: '#1F4A42',
        'kawung-gold': '#C69C54',
        'light-gold': '#DDBE82',
        'dark-gold': '#8A662C',
        ivory: '#F4E9D7',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        gold: '0 8px 32px -8px rgba(198, 156, 84, 0.35)',
        keraton: '0 20px 50px -12px rgba(20, 48, 43, 0.65)',
      },
    },
  },
  plugins: [],
};
