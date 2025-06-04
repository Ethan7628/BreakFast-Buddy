import { Navigate, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const AuthRoute = () => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login\" replace />;
};