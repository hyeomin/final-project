import { useContext } from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
import { auth } from './firebase';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  //console.log('로그인상태=====>', auth?.isAuth);
  if (!auth?.isAuth) return <Navigate to={'/'} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
