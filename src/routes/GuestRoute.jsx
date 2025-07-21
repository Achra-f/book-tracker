import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/books" replace />
    }
    return <Outlet />
}
