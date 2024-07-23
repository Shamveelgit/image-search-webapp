/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        mainImage : "url('../src/assets/bg-img.jpg')",
        halfBlack : "linear-gradient(360deg, rgba(0,0,0,1),rgba(255, 255, 255, 0),rgba(255, 255, 255, 0))"
      },
      fontFamily : {
        Ui : '"Quicksand", sans-serif'
      },
      backgroundSize : {
        fullScreen : "1280px 800px" ,
        largeScreen : "1536px 800px", 
        screenWidth : "100% 800px" 
      },
      borderRadius : {
        leftSide : "28px 0 0 28px",
        rightSide : "0 28px 28px 0"
      },
    },
  },
  plugins: [],
}