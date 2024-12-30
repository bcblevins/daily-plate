/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStatus } from "../services/auth";

function PrivateRoute({children}) {
    const { session, loading } = useAuthStatus();

    if (loading) {
        console.log("Loading")
        return <div>Loading...</div>
    }
    
    if(!session){
        console.log("No Session")
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;