import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('quicksell_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would be an API call
    if (email === 'admin@quicksell.com' && password === 'admin123') {
      const adminUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@quicksell.com',
        role: 'admin' as const
      };
      setUser(adminUser);
      localStorage.setItem('quicksell_user', JSON.stringify(adminUser));
      toast.success('Welcome back, Admin!');
      setIsLoading(false);
      return true;
    } else if (email === 'johndoe@quicksell.com' && password === 'user123') {
      const customerUser = {
        id: '2',
        name: 'John Doe',
        email: 'johndoe@quicksell.com',
        role: 'customer' as const
      };
      setUser(customerUser);
      localStorage.setItem('quicksell_user', JSON.stringify(customerUser));
      toast.success('Welcome back!');
      setIsLoading(false);
      return true;
    } else {
      toast.error('Invalid credentials');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role: 'customer' as const
    };

    setUser(newUser);
    localStorage.setItem('quicksell_user', JSON.stringify(newUser));
    toast.success('Account created successfully!');
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quicksell_user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};