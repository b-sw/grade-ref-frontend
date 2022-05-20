import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {Paths} from "../../shared/Paths";

export const RequireAuthRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  return auth.isLoggedIn ? <Outlet /> : <Navigate to={Paths.LOGIN} state={{ from: location }} replace />;
};
