/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ecn-dark-blue": "#0a192f",
        "ecn-navy": "#112240",
        "ecn-white": "#f8f9fa",
        "ecn-black": "#0f0f0f",
      },
      fontFamily: {
        noto: ['"Noto Sans Sinhala"', "sans-serif"],
        kotu: ['"HarshaKotu"', "sans-serif"],
        bathala: ['"HarshaBathala"', "sans-serif"],
        raum: ['"HarshaRaum"', "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
