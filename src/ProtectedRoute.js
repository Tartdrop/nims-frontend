import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ROUTES = {
    client: [
        '/home/client',
        '/submit-a-request',
        '/request-submitted',
        '/request-review',
        '/request-results',
        '/track-my-request',
        '/guide',
    ],
    staff: [
        '/home/staff',
        '/pending-requests',
        '/request-details',
        '/request-control-number',
        '/approved',
        '/request-additional-info',
        '/for-release',
        '/receive-release-database',
    ],
    chemtester: [
        '/home/chemtester',
        '/for-testing-chem',
        '/test-results-chem',
        '/testing-database-chem',
    ],
    microbiotester: [
        '/home/microbiotester',
        '/for-testing-microbio',
        '/test-results-microbio',
        '/testing-database-microbio',
    ],
    molbiotester: [
        '/home/molbiotester',
        '/for-testing-molbio',
        '/test-results-molbio',
        '/testing-database-molbio',
    ],
};

const ProtectedRoute = ({ isLoggedIn, userType, userId, redirectPath = '/login' }) => {
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    // Check if the current path is authorized
    const isAuthorizedPath = ROUTES[userType]?.some(path => location.pathname.startsWith(path));

    // Redirect unauthorized users
    if (!isAuthorizedPath) {
        return <Navigate to={`/home/${userType}/${userId}`} replace />;
    }

    // Render the child components
    return <Outlet />;
};

export default ProtectedRoute;
