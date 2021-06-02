import React, { createContext, ReactNode, useContext } from 'react';
import * as Google from 'expo-google-app-auth';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const signInWithGoogle = async () => {
    try {
      const response = await Google.logInAsync({
        iosClientId: '',
        androidClientId: '',
        scopes: ['profile', 'email'],
      });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ user: 'Charles' }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
