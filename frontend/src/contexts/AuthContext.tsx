import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  farmName?: string;
  location?: string;
  role: 'farmer' | 'manager' | 'admin';
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  profile: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await api.getProfile();
      setUser(profile);
    } catch (error) {
      console.error('Error loading profile:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const data = await api.register(email, password, fullName);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const signIn = async (email: string, password: string) => {
    const data = await api.login(email, password);
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    const updatedUser = await api.updateProfile(updates);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: user,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
