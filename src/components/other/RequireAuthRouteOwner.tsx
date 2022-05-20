import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {Paths} from "../../shared/Paths";

export const RequireAuthRouteOwner = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoggedInAsOwner) {
    return <Outlet />;
  }

  if (auth.isLoggedInAsAdmin) {
    return <Navigate to={Paths.ADMIN_EXPLORER} state={{ from: location }} replace />;
  }

  if (auth.isLoggedIn) {
    return <Navigate to={Paths.DASHBOARD} state={{ from: location }} replace />;
  }

  return <Navigate to={Paths.LOGIN} state={{ from: location }} replace />;
};
