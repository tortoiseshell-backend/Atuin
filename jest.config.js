module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/client/src/components$1',
    '^@assets(.*)$': '<rootDir>/client/src/assets$1',
    '^@reducers(.*)$': '<rootDir>/client/src/reducers$1',
    '^@fonts(.*)$': '<rootDir>/client/src/assets/fonts$1',
    '^@icons(.*)$': '<rootDir>/client/src/assets/icons$1',
    '^@images(.*)$': '<rootDir>/client/src/assets/images$1',
    '^@css(.*)$': '<rootDir>/client/src/css$1',
    '^@store$': '<rootDir>/client/src/store/store.js',
    '^@modular(.*)$': '<rootDir>/client/src/modular$1',
  },
};
