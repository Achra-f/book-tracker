import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../AuthContext.jsx";

export default function ProtectedRoute() {
    const { token, loading } = useAuth()

    if (loading) return <span className="loading loading-spinner loading-xl"></span>

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
