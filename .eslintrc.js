module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/no-deprecated': ['off'],
    'react/prop-types': ['off'],
  },
}
