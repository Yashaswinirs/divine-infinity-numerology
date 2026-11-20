import type { User } from '@divine/types';
import { db } from '../../config/db.config';

export type UserRecord = User & { passwordHash: string };

export class AuthModel {
  static findByEmail(email: string): UserRecord | undefined {
    for (const user of db.users.values()) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return user;
      }
    }
    return undefined;
  }

  static findById(id: string): UserRecord | undefined {
    return db.users.get(id);
  }

  static create(user: UserRecord): UserRecord {
    db.users.set(user.id, user);
    return user;
  }
}
