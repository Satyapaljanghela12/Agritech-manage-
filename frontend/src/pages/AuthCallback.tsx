import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const AuthCallback = () => {
  const { signIn } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      window.location.href = '/';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );
};
