import { Page, expect } from '@playwright/test';
import {
  AvailableBoards,
  StepDictionary,
  StepParams, UserRole,
} from '../../types';
import { UserFactory } from '../../lib/factories/user.factory';
import { ProjectBoard } from '../../lib/site/project-board';


export const createSteps = (projectBoard: ProjectBoard): StepDictionary => ({
  'Login to Demo App': async (_page: Page, params: StepParams) => {
    if (!params.role) {
      throw new Error('Role parameter is required for login');
    }

    const user = params.role === UserRole.ADMIN
      ? UserFactory.createAdminUser()
      : UserFactory.createRegularUser();

    await projectBoard.goto();
    await projectBoard.loginPage.login(user);
  },

  'Navigate to': async (_page: Page, params: StepParams) => {
    if (!params.feature) {
      throw new Error('Feature parameter is required for navigation');
    }

    await projectBoard.selectBoard(params.feature as AvailableBoards);
  },

  'Verify Task in Column': async (_page: Page, params: StepParams) => {
    if (!params.task || !params.column) {
      throw new Error('Task and column parameters are required for task verification');
    }

    await projectBoard.currentBoard.findAndSetCurrentTask(params.task);

    const isInCorrectSwimlane = await projectBoard.currentBoard.verifyTaskSwimlane(params.column);
    expect(isInCorrectSwimlane).toBeTruthy();
  },

  'Confirm Tags': async (_page: Page, params: StepParams) => {
    if (!params.tags) {
      throw new Error('Tags parameter is required for tag confirmation');
    }

    const hasCorrectTaskTags = await projectBoard.currentBoard.verifyTaskTags(params.tags as string[]);
    expect(hasCorrectTaskTags).toBeTruthy();
  },
});
