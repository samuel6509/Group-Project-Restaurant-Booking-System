module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",  //Using Babel to transpile JSX files
  },
  testEnvironment: 'jest-environment-jsdom',  //This should be separate from transform

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/resources/js/$1', //Paths
  },
};