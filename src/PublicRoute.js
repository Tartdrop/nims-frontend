// PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ isLoggedIn, userType, userId, children }) => {
    // Redirect to the specific home page based on userType and userId if the user is logged in
    if (isLoggedIn) {
        return <Navigate to={`/home/${userType}/${userId}`} />;
    }
    return children;
};

export default PublicRoute;
