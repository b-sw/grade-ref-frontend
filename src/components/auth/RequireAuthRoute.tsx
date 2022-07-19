import {Navigate, Outlet, useLocation} from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import {Path} from "utils/Path";

export const RequireAuthRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to={Path.LANDING_PAGE} state={{ from: location }} replace />;
};
