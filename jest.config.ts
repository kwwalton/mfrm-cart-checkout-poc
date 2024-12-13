import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageDirectory: "<rootDir>/.coverage",
  testMatch: ["**/*.(test|spec).(ts|tsx)"],
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 55,
      lines: 55,
      statements: 55,
    },
  },
  testPathIgnorePatterns: [
    "sw/",
    ".xdn/",
    ".edgio/",
    ".eslintrc.js",
    "/public",
    "/node_modules",
  ],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  //TODO: To be tuned on the final folder structure
  collectCoverageFrom: ["<rootDir>/src/**/*.(ts|tsx)"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/global.d.ts",
    "/src/app/layout.tsx",
    "/src/__mocks/",
    "/src/components/unbxd",
    "src/__generated__/",
    "src/gql/",
    // ignore irrelevant folders
    // '/src/(pages|_constants|_types|styles)/',
    // ignore modules that are not related to home page or deprecated
    // '/src/modules/(pdp|checkout|RecentlyViewed|SaleBanner|ReturnToCart|Banner)/',
    // '/src/components/Banner/',
  ],
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
