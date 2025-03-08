/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
         boxShadow: {
       'purple-glow': '0px 0px 5px 5px rgba(144, 43, 255, 0.25)', // Custom shadow
      },
      colors:{
        "purple-light":"rgba(144, 43, 255, 0.25)",
        "purple-dark":"rgba(144, 43, 255)"
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
}