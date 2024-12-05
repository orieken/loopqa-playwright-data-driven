import { Page } from 'playwright';
import { Site } from './common/site';
import { LoginPage } from './pages/login';
import { Board } from './partials/board';
import { AvailableBoards } from '../../types';

export class ProjectBoard extends Site {
  url: string = 'https://animated-gingersnap-8cf7f2.netlify.app/'

  loginPage!: LoginPage;
  currentBoard!: Board;

  constructor(page: Page) {
    super(page);
    this.createPages();
  }

  async goto() {
    await this.page.goto(this.url);
  }

  createPages() {
    this.loginPage = new LoginPage(this.page);
  }

  async selectBoard(board: AvailableBoards): Promise<void> {
    const BoardMap: { [key in AvailableBoards]: string } = {
      'Web Application': 'Web Application Main web',
      'Mobile Application': 'Mobile Application Native',
      'Marketing Campaign': 'Marketing Campaign Q2',
    }

    await this.page.getByRole('button', { name: BoardMap[board] }).click();
    this.currentBoard = new Board(this.page);
  }
}
