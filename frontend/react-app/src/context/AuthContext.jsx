
import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem('sos_token')
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('sos_user') || 'null');
    } catch {
      return null;
    }
  });

  function saveSession(response) {
    localStorage.setItem('sos_token', response.token);
    localStorage.setItem('sos_user', JSON.stringify(response.usuario));

    setToken(response.token);
    setUser(response.usuario);
  }

  function logout() {
    localStorage.removeItem('sos_token');
    localStorage.removeItem('sos_user');

    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token && user),
    saveSession,
    logout,
  }), [token, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }

  return context;
}

