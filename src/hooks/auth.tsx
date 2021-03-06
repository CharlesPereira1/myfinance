import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  userStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@myFinance:user';

  const signInWithGoogle = async () => {
    try {
      const response = await Google.logInAsync({
        iosClientId:
          '901841403397-kvr54sj35pdo7clt72rv1fk1aplor2uv.apps.googleusercontent.com',
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

        setUser(userLogeed);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogeed));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (response) {
        const name = response.fullName?.givenName!;
        const photo = `https://ui-avatars.com/api/?name=John+Doe${name}&length=1`;

        const userLogeed = {
          id: String(response.user),
          email: response.email!,
          name,
          photo,
        };

        setUser(userLogeed);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogeed));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  };

  useEffect(() => {
    const loadUserStorageDate = async () => {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    };

    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStorageLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
