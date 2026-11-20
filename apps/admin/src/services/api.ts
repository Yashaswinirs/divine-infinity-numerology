import { adminAuthStore } from '../store/authStore';

const API_BASE = 'http://localhost:5000/api/v1';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const tokens = adminAuthStore.getState().tokens;
  const headers = new Headers(options.headers || {});

  headers.set('Content-Type', 'application/json');
  if (tokens?.accessToken) {
    headers.set('Authorization', `Bearer ${tokens.accessToken}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API Request failed');
  }

  return data.data;
}
