import { test as base } from '@playwright/test';
import { TestFixtures } from './types';
import { ProjectBoard } from './lib/site/project-board';


export const test = base.extend<TestFixtures>({
  projectBoard: async ({ page }, use) => {
    const projectBoard = new ProjectBoard(page);
    await use(projectBoard);
  },
});
