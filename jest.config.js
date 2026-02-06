module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/types/**/*.ts',
  ],
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', {
      diagnostics: false,
      tsconfig: { allowJs: true },
    }],
  },
};
