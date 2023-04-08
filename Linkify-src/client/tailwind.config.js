module.exports = {
  mode: "jit",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
    container: {
      center: true,
    },
    screens: {
      'sm': '640',
      // => @media (min-width: 640px) { ... }

      'md': '834',
      // => @media (min-width: 834px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tw-elements/dist/plugin")
  ],
}