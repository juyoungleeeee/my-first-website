import { useState, useEffect } from 'react';

/**
 * 인증 상태 관리 커스텀 훅
 * localStorage 기반의 간단한 세션 관리
 */
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('community_user');
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('community_user', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('community_user');
    setCurrentUser(null);
  };

  return { currentUser, login, logout };
}
