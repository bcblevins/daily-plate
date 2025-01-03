/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuthStatus } from "../services/auth";
import { useUserContext } from "../hooks/useUserContext";
import { refreshUser } from "../services/userContextService";

function PrivateRoute({children}) {
    const { session, loading } = useAuthStatus();
    const [user, setUser] = useUserContext()

    if (loading) {
        return <div>Loading...</div>
    }
    
    if(!session){
        console.log("No Session")
        return <Navigate to="/login" replace />;
    }

    if (JSON.stringify(user) === "{}") {
        refreshUser(setUser)
        return <div>Loading...</div>
    }

    return children;
}

export default PrivateRoute;