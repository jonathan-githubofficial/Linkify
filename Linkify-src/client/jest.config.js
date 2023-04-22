module.exports = {
    setupFilesAfterEnv: ['./node_modules/jest-enzyme/lib/index.js'],
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    testEnvironment: 'enzyme',
    testEnvironmentOptions: {
      enzymeAdapter: 'react16',
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: { resources: 'usable' },
    setupFilesAfterEnv: ['./setupTests.js'],
    moduleNameMapper: { '\\.(css|less)$': 'identity-obj-proxy' },
    coverageReporters: ['text', 'lcov'],
    verbose: true,
    globals: {
      'process.env.NODE_ENV': 'test',
      'process.env.BABEL_ENV': 'test',
    },
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest",
      "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/",
      "\\.pnp\\.[^\\/]+$"
    ],
  };
  