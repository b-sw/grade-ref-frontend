import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {Paths} from "../../other/Paths";

export const RequireAuthRouteAdmin = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoggedInAsAdmin) {
    return <Outlet />;
  }

  if (auth.isLoggedIn) {
    return <Navigate to={Paths.DASHBOARD} state={{ from: location }} replace />;
  }

  return <Navigate to={Paths.LOGIN} state={{ from: location }} replace />;
};
