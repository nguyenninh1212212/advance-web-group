module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
