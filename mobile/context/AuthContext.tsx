import { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  bio?: string;
  savedPointIds?: string[];
  friendUserIds?: string[];
  isEmailVerified?: boolean;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  loginUser: (token: string, user: User) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  function loginUser(newToken: string, newUser: User) {
    setToken(newToken);
    setUser(newUser);
  }

  function logoutUser() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}