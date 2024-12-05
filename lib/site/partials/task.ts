import { Locator } from 'playwright';

export class Task {
  constructor(private readonly taskElement: Locator) {}

  async getTitle(): Promise<string | null> {
    return await this.taskElement.locator('h3').textContent();
  }

  async getDescription(): Promise<string | null> {
    return await this.taskElement.locator('p').textContent();
  }

  async getTags(): Promise<string[]> {
    return await this.taskElement.locator('.rounded-full').allTextContents();
  }

  async getAssignee(): Promise<string | null> {
    return await this.taskElement.locator('.flex.items-center.gap-1 span').first().textContent();
  }

  async getDueDate(): Promise<string | null> {
    return await this.taskElement.locator('.flex.items-center.gap-1 span').last().textContent();
  }
}
