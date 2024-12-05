import { Locator, Page } from 'playwright';
import { User } from '../../models/user.model';
import { BasePage } from '../common/base-page';

export class LoginPage extends BasePage {
  username: Locator;
  password: Locator;
  signIn: Locator;

  constructor(page: Page) {
    super(page);
    this.username = this.page.getByLabel('Username');
    this.password = this.page.getByLabel('Password');
    this.signIn = this.page.getByRole('button', { name: 'Sign in' });
  }

  async login(user: User): Promise<void> {
    const { username, password } = user.getCredentials();
    await this.username.waitFor({ state: 'attached' });
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signIn.click();
  }
}
