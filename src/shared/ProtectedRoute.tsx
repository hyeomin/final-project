import { useContext } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auth } from './firebase';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth?.isAuth) return <Navigate to={'/'} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
