module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  parser: 'babel-eslint',
  rules: {
    'no-invalid-this': 'error',
    'object-curly-spacing': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'arrow-parens': ['error', 'as-needed'],
    'space-before-function-paren': 'off',
    'max-len': ['warn', { ignoreComments: true, ignoreStrings: true, code: 180, tabWidth: 4 }],
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-unused-vars': ['error', { vars: 'all', args: 'all', argsIgnorePattern: '^_', caughtErrors: 'all', caughtErrorsIgnorePattern: '^ignore' }],
    // react
    'react/no-deprecated': 'warn',
    'react/jsx-uses-vars': 'error',
    // react-hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  env: {
    node: true,
    es6: true,
    browser: true,
    commonjs: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
};
