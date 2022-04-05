module.exports = {
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{ts,tsx}",
    "<rootDir>/src/**/?(*.)(test).{ts,tsx}",
  ],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};