import type { User, Role } from '@divine/types';
import { db } from '../../config/db.config';

export class UsersModel {
  static getAll(): User[] {
    return Array.from(db.users.values()).map((u) => {
      const { passwordHash: _, ...safe } = u;
      return safe;
    });
  }

  static getById(id: string): User | undefined {
    const user = db.users.get(id);
    if (!user) return undefined;
    const { passwordHash: _, ...safe } = user;
    return safe;
  }

  static update(id: string, updates: Partial<User>): User | undefined {
    const user = db.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
    db.users.set(id, updated);
    const { passwordHash: _, ...safe } = updated;
    return safe;
  }

  static setBlocked(id: string, isBlocked: boolean): User | undefined {
    return this.update(id, { isBlocked });
  }

  static setRole(id: string, role: Role): User | undefined {
    return this.update(id, { role });
  }
}
