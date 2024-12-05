import { Locator, Page } from 'playwright';
import { Task } from './task';

export class Swimlane {
  readonly columnLocator: Locator;

  constructor(
    private readonly page: Page,
    private readonly name: string
  ) {
    this.columnLocator = this.page.locator('.flex.flex-col.w-80', {
      has: page.locator('h2', { hasText: name })
    });
  }

  async getTasks(): Promise<Task[]> {
    const taskElements = await this.columnLocator
      .locator('.bg-white.p-4.rounded-lg')
      .all();

    return taskElements.map(element => new Task(element));
  }

  async getTaskCount(): Promise<number> {
    const countText = await this.columnLocator
      .locator('h2 span')
      .textContent();

    return parseInt(countText?.replace(/[()]/g, '') || '0');
  }

  async findTaskByTitle(title: string): Promise<Task | null> {
    const taskElement = this.columnLocator.locator('h3', {
      hasText: title
    }).locator('..');

    if (await taskElement.count() === 0) return null;
    return new Task(taskElement);
  }

  async getName(): Promise<string | null> {
    return await this.columnLocator.locator('h2').textContent();
  }
}