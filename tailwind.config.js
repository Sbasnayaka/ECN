/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ecn-dark-blue': '#0a192f',
        'ecn-navy': '#112240',
        'ecn-white': '#f8f9fa',
        'ecn-black': '#0f0f0f',
      }
    },
  },
  plugins: [],
}
