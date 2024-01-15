// AuthContext.tsx
import { createContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../src/shared/firebase';

interface AuthContextProps {
  init: boolean;
  isAuth: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [init, setInit] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(!!auth.currentUser);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuth(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setCurrentUser(user);
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
      setInit(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ init, isAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
