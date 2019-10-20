module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**.ts",
    "!src/index.ts"
  ],
  verbose: process.env.CI === 'true'
};
