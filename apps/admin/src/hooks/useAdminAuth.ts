import { useState, useEffect } from 'react';
import { adminAuthStore } from '../store/authStore';

export function useAdminAuth() {
  const [state, setState] = useState(adminAuthStore.getState());

  useEffect(() => {
    const unsubscribe = adminAuthStore.subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user: state.user,
    isAuthenticated: !!state.user && state.user.role === 'admin',
  };
}
