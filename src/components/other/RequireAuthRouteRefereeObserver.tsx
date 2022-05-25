import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {Paths} from "../../shared/Paths";

export const RequireAuthRouteRefereeObserver = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoggedInAsReferee || auth.isLoggedInAsObserver) {
    return <Outlet />;
  }

  if (auth.isLoggedInAsOwner) {
    return <Navigate to={Paths.OWNER_DASHBOARD} state={{ from: location }} replace />;
  }

  if (auth.isLoggedInAsAdmin) {
    return <Navigate to={Paths.ADMIN_EXPLORER} state={{ from: location }} replace />;
  }

  return <Navigate to={Paths.LOGIN} state={{ from: location }} replace />;
};
