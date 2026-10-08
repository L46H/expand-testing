import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL;
if (!baseURL) {
  throw new Error('BASE_URL environment variable is required');
}

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,

  expect: {
    timeout: 15_000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['html', { open: 'on-failure' }]],

  use: {
    baseURL,
    trace: 'on-first-retry'
  },

  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'api',
      testDir: './tests/api'
    }
  ]
});
