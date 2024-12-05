import { Page } from 'playwright';

export abstract class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
