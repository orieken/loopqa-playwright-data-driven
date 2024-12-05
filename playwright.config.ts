import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './specs',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report',

        embedAttachments: true,
      },
    ],
    ['list'],
  ],
  use: {
    baseURL: 'https://animated-gingersnap-8cf7f2.netlify.app/',
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on-first-retry',
    video: {
      mode: 'on',
      size: {
        width: 1920,
        height: 1080,
      },
    },
    viewport: { width: 1920, height: 1080 },
  },
  outputDir: 'test-results',
  preserveOutput: 'always',
};

export default config;
