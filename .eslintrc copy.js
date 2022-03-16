module.exports = {
  env: {
    node: true,
    // "browser": true,
    // "es2021": true
  },
  root: true,
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    // "ecmaVersion": "latest",
    // "sourceType": "module"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // отступы
    'key-spacing': 'off',
    'no-multi-spaces': 'off',
    'space-before-blocks': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'no-trailing-spaces': 'off',
    'semi-spacing': 'off',
    'padded-blocks': 'off',
    'spaced-comment': 'off',
    'indent': 'off',
    //
    // '@typescript-eslint/no-empty-function': 'off',
    // '@typescript-eslint/ban-ts-comment': 'off',
    // //
    // 'vue/multi-word-component-names': 'off',
    //
    'import/first': 'off',
    //
    'comma-dangle': 'off',
    'quotes': 'warn',
    'quote-props': 'off',
    'object-curly-spacing': 'off',
    'array-bracket-spacing': 'off',
    'keyword-spacing': 'off',
    'prefer-const': 'warn',
    'no-multiple-empty-lines': [2, { "max": 99999, "maxEOF": 0} ],
    'semi': ['warn', 'always']
  }
}
