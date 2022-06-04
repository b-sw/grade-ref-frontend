import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {Path} from "../../shared/Path";

export const RequireAuthRouteOwner = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoggedInAsOwner) {
    return <Outlet />;
  }

  if (auth.isLoggedInAsAdmin) {
    return <Navigate to={Path.ADMIN_EXPLORER} state={{ from: location }} replace />;
  }

  if (auth.isLoggedInAsReferee || auth.isLoggedInAsObserver) {
    return <Navigate to={Path.EXPLORER} state={{ from: location }} replace />;
  }

  return <Navigate to={Path.LANDING_PAGE} state={{ from: location }} replace />;
};
