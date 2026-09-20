/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        ivory: '#FFFFF0',
        champagne: '#F7E7CE',
        accent: '#D32F2F', // Her favourite color (placeholder)
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
