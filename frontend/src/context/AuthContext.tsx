import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: any;
  role: string | null;
  loading: boolean;
  signIn: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string, firstname: string, lastname: string, role: string) => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  fetchUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setRole(response.data.role);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signIn = async (email: string, password: string, role: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password, role });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setUser(response.data.user);
    setRole(role);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setRole(null);
  };

  const signUp = async (email: string, password: string, firstname: string, lastname: string, role: string) => {
    const response = await axios.post('http://localhost:5000/api/auth/signup', {
      email,
      password,
      firstname,
      lastname,
      role,
    });
    const token = response.data.token;
    localStorage.setItem('token', token);
    setUser(response.data.user);
    setRole(role);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signOut, signUp, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
