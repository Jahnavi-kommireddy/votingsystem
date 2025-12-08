import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  dob: string;
  phone: string;
  voterId: string;
  username: string;
  password: string;
  isAdmin: boolean;
};

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'isAdmin'>) => boolean;
  isLoggedIn: boolean;
  resetPassword: (username: string, voterId: string, newPassword: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    let initialUsers = savedUsers ? JSON.parse(savedUsers) : [];

    if (!initialUsers.find((u: User) => u.username === 'admin')) {
      initialUsers.push({
        name: 'Admin',
        dob: '1990-01-01',
        phone: '9999999999',
        voterId: 'ADM1234567',
        username: 'admin',
        password: 'Admin@123',
        isAdmin: true,
      });
    }
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (userData: Omit<User, 'isAdmin'>): boolean => {
    if (users.find(u => u.username === userData.username)) {
      return false;
    }

    if (users.find(u => u.voterId === userData.voterId)) {
      return false;
    }

    const newUser = {
      ...userData,
      isAdmin: false
    };

    setUsers([...users, newUser]);
    return true;
  };

  const resetPassword = (username: string, voterId: string, newPassword: string): boolean => {
    const userIndex = users.findIndex(u => u.username === username && u.voterId === voterId);
    
    if (userIndex === -1) {
      return false;
    }

    const updatedUsers = [...users];
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      password: newPassword
    };

    setUsers(updatedUsers);
    return true;
  };

  const value = {
    currentUser,
    users,
    setUsers,
    login,
    logout,
    register,
    isLoggedIn: !!currentUser,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};