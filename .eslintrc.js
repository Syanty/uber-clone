module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    "vue/attributes-order": 0,
    "vue/require-prop-types": 0,
    "vue/order-in-components":0,
    "no-console":0,
    "vue/attribute-hyphenation":0
  }
}
