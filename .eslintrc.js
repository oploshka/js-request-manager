module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:oploshka/recommended',
    'plugin:oploshka/overrides-test-jest',
  ],
};
