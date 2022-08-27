import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { Path } from 'utils/Path';

export const RequireAuthRouteReferee = () => {
    const auth = useAuth();
    const location = useLocation();

    if (auth.isLoggedInAsReferee) {
        return <Outlet />;
    }

    if (auth.isLoggedInAsOwner) {
        return <Navigate to={Path.OWNER_DASHBOARD} state={{ from: location }} replace />;
    }

    if (auth.isLoggedInAsAdmin) {
        return <Navigate to={Path.ADMIN_EXPLORER} state={{ from: location }} replace />;
    }

    if (auth.isLoggedInAsObserver) {
        return <Navigate to={Path.EXPLORER} state={{ from: location }} replace />;
    }

    return <Navigate to={Path.LANDING_PAGE} state={{ from: location }} replace />;
};
