import fs from 'fs'
import path from 'path'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkgJson = require(path.resolve("package.json"));

const configPath = path.resolve('setupTests.js')

export default () => {
  const setupTestsFile = fs.existsSync(configPath)
    ? configPath
    : undefined;

  const config = {
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    setupFilesAfterEnv: setupTestsFile ? [setupTestsFile] : [],
    transform: {},
    testEnvironment: 'node',
    testEnvironmentOptions: {
      url: 'http://localhost'
    },
    rootDir: path.resolve(),
  };


  const customConfig = pkgJson.jest;

  if (customConfig) {
    Object.keys(customConfig).forEach(key => {
      config[key] = customConfig[key];
    });
  }

  return config;
};
