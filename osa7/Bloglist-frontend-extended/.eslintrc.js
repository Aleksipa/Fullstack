module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'cypress/globals': true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: [
    'react', 'jest', 'cypress'
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] },
    ],
    'react/prop-types': 0,
  },
  
};
