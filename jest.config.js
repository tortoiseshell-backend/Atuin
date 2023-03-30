module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['testdata', '__mocks__'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
    '^@components(.*)$': '<rootDir>/client/src/components$1',
    '^@assets(.*)$': '<rootDir>/client/src/assets$1',
    '^@reducers(.*)$': '<rootDir>/client/src/reducers$1',
    '^@fonts(.*)$': '<rootDir>/client/src/assets/fonts$1',
    '^@icons(.*)$': '<rootDir>/client/src/assets/icons$1',
    '^@images(.*)$': '<rootDir>/client/src/assets/images$1',
    '^@css(.*)$': '<rootDir>/client/src/css$1',
    '^@store$': '<rootDir>/client/src/store/store.js',
    '^@mock$': '<rootDir>/testSetUp/generateMockResponse.js',
    '^@modular(.*)$': '<rootDir>/client/src/modular$1',
    '^@lib(.*)$': '<rootDir>/client/src/lib$1',
  },
};
