import bcrypt from 'bcryptjs';
import { AuthModel, type UserRecord } from './auth.model';
import { TokenService } from './token.service';
import type { AuthSession, User } from '@divine/types';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthSession> {
    const user = AuthModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.isBlocked) {
      throw new Error('Account is deactivated. Please contact support.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const tokens = TokenService.generateTokens(user.id, user.email, user.role);

    const safeUser: User = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      avatarUrl: user.avatarUrl,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { user: safeUser, tokens };
  }

  static async register(fullName: string, email: string, password: string, phoneNumber?: string): Promise<AuthSession> {
    const existing = AuthModel.findByEmail(email);
    if (existing) {
      throw new Error('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = `user-student-${Date.now()}`;
    const newUser: UserRecord = {
      id,
      email,
      fullName,
      phoneNumber,
      role: 'student',
      isBlocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      passwordHash,
    };

    AuthModel.create(newUser);
    const tokens = TokenService.generateTokens(newUser.id, newUser.email, newUser.role);

    const safeUser: User = {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
      isBlocked: newUser.isBlocked,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return { user: safeUser, tokens };
  }

  static async refresh(refreshToken: string): Promise<AuthSession> {
    const decoded = TokenService.verifyRefreshToken(refreshToken);
    const user = AuthModel.findById(decoded.sub);
    if (!user || user.isBlocked) {
      throw new Error('Invalid session');
    }

    const tokens = TokenService.generateTokens(user.id, user.email, user.role);
    const safeUser: User = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      avatarUrl: user.avatarUrl,
      isBlocked: user.isBlocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { user: safeUser, tokens };
  }
}
