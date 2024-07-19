module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    "no-console": 0,
    "vue/require-default-prop": 0,
    "vue/no-unused-components": 1,
    "no-unused-vars": 1
  }
}
