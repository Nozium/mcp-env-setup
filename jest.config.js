/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  moduleNameMapper: {
    '^@commands/(.*)$': '<rootDir>/src/commands/$1',
    '^@templates/(.*)$': '<rootDir>/src/templates/$1',
    '^@generators/(.*)$': '<rootDir>/src/generators/$1',
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
  ],
};