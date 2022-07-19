import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { AuthId, MayBe, User } from '@/types';
import { AUTH_ID_KEY } from '@/constants';
import { getUser } from '@/util/auth';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@chakra-ui/react';
import { AppLoader } from '@/components/AppLoader';

interface AppContextProps {
  isLoggedIn: boolean;
  user: MayBe<User>;
  authId: MayBe<string>;
  setAuthId: Dispatch<SetStateAction<MayBe<AuthId>>>;
  setUser: Dispatch<SetStateAction<MayBe<User>>>;
}
interface AppContextProviderProps {
  children: ReactNode;
}
export const initialAppContext = {
  isLoggedIn: false,
  user: null,
  authId: null,
  setAuthId: (prevState: SetStateAction<MayBe<AuthId>>) => prevState,
  setUser: (prevState: SetStateAction<MayBe<User>>) => prevState,
};

export const AppContext = createContext<AppContextProps>(initialAppContext);
export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [authId, setAuthId] = useState<MayBe<AuthId>>(
    window.localStorage[AUTH_ID_KEY] || null,
  );
  const [status, setStatus] = useState('IDLE');
  const [user, setUser] = useState<MayBe<User>>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (authId) {
      setStatus('PENDING');
      getUser(authId)
        .then((user) => {
          setStatus('SUCCESS');
          setUser(user);
          navigate('/home', {
            replace: true,
          });
        })
        .catch((error) => {
          setStatus('ERROR');
          console.error(error);
          navigate('/');
        });
    }
  }, [authId]);
  const providerValue: AppContextProps = {
    ...initialAppContext,
    authId,
    user,
    setAuthId,
    setUser,
  };
  let content: ReactNode;
  switch (status) {
    case 'IDLE':
    case 'PENDING':
      content = <AppLoader></AppLoader>;
    case 'ERROR':
      content = <Alert status="error">Something went wrong!</Alert>;
    case 'SUCCESS':
      content = (
        <AppContext.Provider value={providerValue}>
          {children}
        </AppContext.Provider>
      );
  }
  return <>{content}</>;
};
