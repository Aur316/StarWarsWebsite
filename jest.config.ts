import type { Config } from "@jest/types";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config.InitialOptions = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/(?!node-fetch/.*)"],
};

export default createJestConfig(config);
