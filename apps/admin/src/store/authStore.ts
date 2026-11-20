import type { User, AuthTokens } from '@divine/types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
}

const AUTH_STORAGE_KEY = 'divine_admin_auth';

class AdminAuthStore {
  private state: AuthState = {
    user: null,
    tokens: null,
  };

  private listeners = new Set<(state: AuthState) => void>();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        this.state = JSON.parse(stored);
      }
    } catch {
      this.state = { user: null, tokens: null };
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save auth to storage', e);
    }
  }

  getState(): AuthState {
    return this.state;
  }

  setSession(user: User, tokens: AuthTokens) {
    this.state = { user, tokens };
    this.saveToStorage();
    this.notify();
  }

  clearSession() {
    this.state = { user: null, tokens: null };
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.notify();
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.state));
  }
}

export const adminAuthStore = new AdminAuthStore();
