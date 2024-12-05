import { UserCredentials, UserRole } from '../../types';

export class User {
  private constructor(
    private readonly username: string,
    private readonly password: string,
    private readonly role: UserRole,
  ) {}

  public getCredentials(): UserCredentials {
    return {
      username: this.username,
      password: this.password,
      role: this.role,
    };
  }

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  static create(username: string, password: string, role: UserRole): User {
    return new User(username, password, role);
  }
}
