module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'drive': "url('/img/drive.jpg')",
        'eat': "url('/img/eat.jpg')",
        'ride': "url('/img/ride.jpg')",
        'business': "url('/img/business.jpg')",
        'reserve': "url('/img/reserve.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
