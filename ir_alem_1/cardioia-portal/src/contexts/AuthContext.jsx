import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula a checagem de um JWT fake no load da aplicação
    const token = localStorage.getItem('@CardioIA:token');
    if (token) {
      setUser({ name: 'Dr. Usuário', role: 'medico' });
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulação de conexão com servidor e API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@cardioia.com' && password === '123456') {
          const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake';
          localStorage.setItem('@CardioIA:token', fakeToken);
          setUser({ name: 'Dr. Usuário', role: 'medico' });
          resolve();
        } else {
          reject('Credenciais inválidas');
        }
      }, 700);
    });
  };

  const logout = () => {
    localStorage.removeItem('@CardioIA:token');
    setUser(null);
  };

  if (loading) return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--primary-color)'}}>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
