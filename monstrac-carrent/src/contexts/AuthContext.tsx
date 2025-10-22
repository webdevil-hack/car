import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'owner';
  verified: boolean;
  walletBalance?: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOTP: (phone: string, otp: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'customer' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth token and validate
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // In a real app, validate token with backend
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, _password: string) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      // Simulating API response
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '+1234567890',
        role: email.includes('admin') ? 'admin' : 'customer',
        verified: true,
        walletBalance: 1000,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Welcome back!');
      
      if (mockUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOTP = async (phone: string, _otp: string) => {
    try {
      setIsLoading(true);
      // In a real app, verify OTP with backend
      const mockUser: User = {
        id: '2',
        name: 'Quick User',
        email: `${phone}@quicklogin.com`,
        phone,
        role: 'customer',
        verified: true,
        walletBalance: 0,
        createdAt: new Date().toISOString(),
      };

      setUser(mockUser);
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        role: data.role || 'customer',
        verified: false,
        walletBalance: 0,
        createdAt: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      // In a real app, this would be an API call
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithOTP,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};