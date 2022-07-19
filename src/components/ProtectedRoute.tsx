import { useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const appContext = useContext(AppContext);
  if (!appContext.user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
