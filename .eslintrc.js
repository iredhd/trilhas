module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }],
    "prefer-default-export": "off",
    "import/no-cycle": "off",
    "eslint-disable react/default-props-match-prop-types": "off",
    // "function-paren-newline": ["error", "never"],
    "import/prefer-default-export": "off",
  },
};
