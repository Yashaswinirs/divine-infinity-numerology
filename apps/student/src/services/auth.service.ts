import { apiFetch } from './api';
import { authStore } from '../store/authStore';
import type { AuthSession, User } from '@divine/types';

export class AuthService {
  static async login(email: string, password: string): Promise<AuthSession> {
    const session = await apiFetch<AuthSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    authStore.setSession(session.user, session.tokens);
    return session;
  }

  static async register(fullName: string, email: string, password: string, phoneNumber?: string): Promise<AuthSession> {
    const session = await apiFetch<AuthSession>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, phoneNumber }),
    });
    authStore.setSession(session.user, session.tokens);
    return session;
  }

  static async getMe(): Promise<User> {
    return apiFetch<User>('/auth/me');
  }

  static logout() {
    authStore.clearSession();
  }
}
