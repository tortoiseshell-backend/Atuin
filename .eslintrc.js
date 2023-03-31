module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'plugin:jest/recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [
            '@components',
            './client/src/components',
          ],
          [
            '@assets',
            './client/src/assets',
          ],
          [
            '@reducers',
            './client/src/reducers',
          ],
          [
            '@fonts',
            './client/src/assets/fonts',
          ],
          [
            '@icons',
            './client/src/assets/icons',
          ],
          [
            '@images',
            './client/src/assets/images',
          ],
          [
            '@css',
            './client/src/css',
          ],
          [
            '@store',
            './client/src/store/store.js',
          ],
          [
            '@mock',
            './testSetUp/generateMockResponse.js',
          ],
          [
            '@lib',
            './client/src/lib',
          ],
          [
            '@modular',
            './client/src/modular',
          ]],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
