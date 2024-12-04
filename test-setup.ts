import { test as base } from '@playwright/test';
import { TestCase } from './types';

export type TestFixtures = {
  testData: TestCase;
};

export const test = base.extend<TestFixtures>({
  // eslint-disable-next-line no-empty-pattern
  testData: async ({}, use, _testInfo) => {
    await use({} as TestCase);
  },
});
