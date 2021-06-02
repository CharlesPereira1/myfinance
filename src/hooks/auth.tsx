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
  // user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const signInWithGoogle = async () => {
    try {
      const response = await Google.logInAsync({
        iosClientId:
          '901841403397-kd8eqkab1f3kvn26aplilh6akl0p63bc.apps.googleusercontent.com',
        androidClientId:
          '901841403397-kd8eqkab1f3kvn26aplilh6akl0p63bc.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (response.type === 'success') {
        const userLogeed = {
          id: String(response.user.id),
          email: response.user.email!,
          name: response.user.name!,
          photo: response.user.photoUrl!,
        };
        console.log(userLogeed);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
