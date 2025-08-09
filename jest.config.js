// jest.config.js (place in root directory alongside package.json)
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/cli.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testTimeout: 10000,
  setupFilesAfterEnv: [],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  verbose: true,
  bail: false,
  errorOnDeprecated: true,
  maxWorkers: "50%",
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/coverage/"],
  transformIgnorePatterns: ["/node_modules/(?!(module-to-transform)/)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
