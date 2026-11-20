import { useState, useEffect } from 'react';
import { authStore } from '../store/authStore';
import type { User } from '@divine/types';

export function useAuth() {
  const [state, setState] = useState(authStore.getState());

  useEffect(() => {
    const unsubscribe = authStore.subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user: state.user,
    isAuthenticated: !!state.user && !!state.tokens,
    role: state.user?.role,
  };
}
