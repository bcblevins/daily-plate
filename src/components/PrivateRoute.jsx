/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStatus } from "../services/auth";

function PrivateRoute({children}) {
    const { isLoggedIn, loading } = useAuthStatus();
    console.log("PrivateRouter isLoggedIn", isLoggedIn)
    console.log("PrivateRoute loading", loading);

    if (loading) {
        return <div>Loading...</div>
    }
    
    if(!isLoggedIn){
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;