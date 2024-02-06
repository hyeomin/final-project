// AuthContext.tsx
import { User, onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { auth } from 'shared/firebase';

interface AuthContextProps {
  init: boolean;
  isAuth: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  updateCurrentUserInContext: (user: User) => void;
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

  const updateCurrentUserInContext = useCallback((user: User) => {
    setCurrentUser(user);
    setIsAuth(!!user);
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
    <AuthContext.Provider value={{ init, isAuth, currentUser, setCurrentUser, logout, updateCurrentUserInContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
