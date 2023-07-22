/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero-img': "url('/public/images/gadgets-bg1.jpg')",
        'hero-img1': "url('/public/images/gadgets-bg2.jpg')",
        'carousel-img': "url('/src/assets/images/bg3.avif')",
      })
    },
  },
  plugins: [],
}

