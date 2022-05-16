import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "./Services/AuthService";

export const Auth = new AuthService();

const PrivateRoute = () => {
    
    return Auth.loggedIn() ? (<Navigate to="/dashboard"/>) : ( <Navigate to="/login" /> )
};

export default PrivateRoute;