module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: "test",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**.ts",
    "!src/index.ts"
  ],
  verbose: process.env.CI === 'true'
};
