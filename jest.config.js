const isCI = process.env.CI === "true";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["docs"],
  collectCoverage: isCI,
  collectCoverageFrom: ["src/**.ts"],
  verbose: isCI
};
