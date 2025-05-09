import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { selectIsAuth } from '../redux/slices/auth';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ redirectPath = '/auth/login' }) => {
  const isAuth = useAppSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
