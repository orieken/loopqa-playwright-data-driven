import { Page } from 'playwright';

export abstract class Site {
  page: Page;
  abstract url: string;

  constructor(page: Page) {
    this.page = page;
  }
}
