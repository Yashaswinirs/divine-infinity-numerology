import { UsersModel } from './users.model';
import type { User, Role } from '@divine/types';
import { db } from '../../config/db.config';

export class UsersService {
  static getAllStudents(): User[] {
    return UsersModel.getAll().filter((u) => u.role === 'student');
  }

  static getAllUsers(): User[] {
    return UsersModel.getAll();
  }

  static getUserProfile(id: string) {
    const user = UsersModel.getById(id);
    if (!user) throw new Error('User not found');

    const enrollments = Array.from(db.enrollments.values()).filter((e) => e.studentId === id);
    const completed = enrollments.filter((e) => e.status === 'completed');
    const certificates = Array.from(db.certificates.values()).filter((c) => c.studentId === id);

    return {
      ...user,
      enrolledCourseCount: enrollments.length,
      completedCourseCount: completed.length,
      certificatesEarned: certificates.length,
    };
  }

  static toggleBlockUser(id: string, isBlocked: boolean): User {
    const user = UsersModel.setBlocked(id, isBlocked);
    if (!user) throw new Error('User not found');
    return user;
  }

  static updateRole(id: string, role: Role): User {
    const user = UsersModel.setRole(id, role);
    if (!user) throw new Error('User not found');
    return user;
  }

  static updateProfile(id: string, updates: { fullName?: string; phoneNumber?: string; avatarUrl?: string }): User {
    const user = UsersModel.update(id, updates);
    if (!user) throw new Error('User not found');
    return user;
  }
}
