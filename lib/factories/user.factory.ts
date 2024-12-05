import { User } from '../models/user.model';
import { UserRole } from '../../types';
import dotenv from 'dotenv';

dotenv.config();

export class UserFactory {
  static createAdminUser(): User {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error('Admin credentials not found in environment variables');
    }

    return User.create(username, password, UserRole.ADMIN);
  }

  static createRegularUser(): User {
    const username = process.env.USER_USERNAME;
    const password = process.env.USER_PASSWORD;

    if (!username || !password) {
      throw new Error('Regular user credentials not found in environment variables');
    }

    return User.create(username, password, UserRole.REGULAR);
  }

  static createTestUser(role: UserRole = UserRole.REGULAR): User {
    const timestamp = new Date().getTime();
    return User.create(
      `testuser_${timestamp}`,
      `testpass_${timestamp}`,
      role
    );
  }
}
