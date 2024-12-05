import { TaskLocation } from '../../../types';
import { Page } from 'playwright';
import { Task } from './task';
import { Swimlane } from './swimlane';

export class Board {
  readonly toDo: Swimlane;
  readonly inProgress: Swimlane;
  readonly review: Swimlane;
  readonly done: Swimlane;
  private currentTaskLocation: TaskLocation | null = null;

  constructor(private readonly page: Page) {
    this.toDo = new Swimlane(page, 'To Do');
    this.inProgress = new Swimlane(page, 'In Progress');
    this.review = new Swimlane(page, 'Review');
    this.done = new Swimlane(page, 'Done');
  }

  async getAllColumns(): Promise<Swimlane[]> {
    return [
      this.toDo,
      this.inProgress,
      this.review,
      this.done
    ];
  }

  async findTaskInAnyColumn(taskTitle: string): Promise<{ column: Swimlane; task: Task } | null> {
    for (const column of await this.getAllColumns()) {
      const task = await column.findTaskByTitle(taskTitle);
      if (task) {
        return { column, task };
      }
    }
    return null;
  }

  async getTotalTaskCount(): Promise<number> {
    const columns = await this.getAllColumns();
    let total = 0;
    for (const column of columns) {
      total += await column.getTaskCount();
    }
    return total;
  }

  async findAndSetCurrentTask(taskTitle: string): Promise<boolean> {
    for (const swimlane of await this.getAllColumns()) {
      const task = await swimlane.findTaskByTitle(taskTitle);
      if (task) {
        this.currentTaskLocation = { task, swimlane };
        return true;
      }
    }
    this.currentTaskLocation = null;
    return false;
  }

  getCurrentTaskLocation(): TaskLocation | null {
    return this.currentTaskLocation;
  }

  async verifyTaskSwimlane(expectedColumn: string): Promise<boolean> {
    if (!this.currentTaskLocation) {
      throw new Error('No task is currently selected. Call findAndSetCurrentTask first.');
    }

    const columnName = await this.currentTaskLocation.swimlane.getName();
    return columnName?.includes(expectedColumn) || false;
  }

  async verifyTaskTags(expectedTags: string[]): Promise<boolean> {
    if (!this.currentTaskLocation) {
      throw new Error('No task is currently selected. Call findAndSetCurrentTask first.');
    }

    const actualTags = await this.currentTaskLocation.task.getTags();
    return expectedTags.every(tag => actualTags.includes(tag));
  }

  async validateTask(taskTitle: string, expectedColumn: string, expectedTags: string[]): Promise<boolean> {
    const taskFound = await this.findAndSetCurrentTask(taskTitle);
    if (!taskFound) return false;

    const columnValid = await this.verifyTaskSwimlane(expectedColumn);
    const tagsValid = await this.verifyTaskTags(expectedTags);

    return columnValid && tagsValid;
  }
}
