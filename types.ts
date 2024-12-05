import { Page } from '@playwright/test';
import { Locator } from 'playwright';
import { ProjectBoard } from './lib/site/project-board';
import { Task } from './lib/site/partials/task';
import { Swimlane } from './lib/site/partials/swimlane';

export interface StepParams {
  feature?: string;
  task?: string;
  column?: string;
  tags?: string[];
  [key: string]: unknown;
}

export interface Step {
  name: string;
  params: StepParams;
}

export interface Verification {
  task: string;
  column: string;
  tags: string[];
}

export interface TestCase {
  name: string;
  feature: string;
  verifications: Verification[];
  steps: Step[];
}

export interface TestFixtures {
  projectBoard: ProjectBoard;
}

export type StepFunction = (page: Page, params: StepParams) => Promise<void>;

export interface StepDictionary {
  [key: string]: StepFunction;
}

export interface TestData {
  testCases: TestCase[];
}

export interface LoginParams extends StepParams {
  username: string;
  password: string;
}

export interface NavigateParams extends StepParams {
  feature: string;
}

export interface VerifyTaskParams extends StepParams {
  task: string;
  column: string;
}

export interface ConfirmTagsParams extends StepParams {
  tags: string[];
}

export type AllStepParams = LoginParams | NavigateParams | VerifyTaskParams | ConfirmTagsParams;

export interface TaskLocation {
  task: Task;
  swimlane: Swimlane;
}

export type AvailableBoards = 'Web Application' | 'Mobile Application' | 'Marketing Campaign';
export type Swimlanes = 'To Do' | 'In Progress' | 'Review' | 'Done';
export type SwimlaneComplete = Swimlane & Locator & (() => Promise<void>) & Page;

export enum UserRole {
  ADMIN = 'ADMIN',
  REGULAR = 'REGULAR',
}

export interface UserCredentials {
  username: string;
  password: string;
  role: UserRole;
}
