import { Navigate } from "react-router-dom";
import useAuth from "./src/components/context/Auth"

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    if (loading) {
        return <div>...Loading</div>
    }
    
    return isAuthenticated ? children : <Navigate to="/login" replace/>
}

export const AuthStatus = () => {
    const {isAuthenticated, user} = useAuth();
    
    if (isAuthenticated) {
        return (
            <p>Welcom {user}!</p>
        )
    }

    return <p>Not logged in </p>
}