// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/*.test.[jt]s?(x)'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(config);
