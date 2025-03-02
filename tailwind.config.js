/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor:{
        "primary-100":"rgb(68, 68, 68)",
        "primary-200":"rgb(255, 43, 96)",
        "primary-300":"rgb(247, 182, 31)",
        "primary-400":"rgb(98, 0, 255)"
      },
      colors:{
        "primary-100":"rgb(68, 68, 68)",
        "primary-200":"rgb(255, 43, 96)",
        "primary-300":"rgb(247, 182, 31)",
        "primary-400":"rgb(98, 0, 255)"
      },
      fontFamily:{
        primary:"Poppins, sans-serif"
      },  
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
