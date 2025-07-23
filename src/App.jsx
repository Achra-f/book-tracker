import {BrowserRouter, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Layout from './Layout.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Index from './pages/books/index.jsx';
import Home from './pages/home.jsx';
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Create from "./pages/books/create.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import {useAuth} from "./AuthContext.jsx";
import {useEffect, useRef} from "react";
import {setLogoutCallback} from "./api/apiClient.js";
import toast, {Toaster} from 'react-hot-toast';
import Read from "./pages/books/read.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Update from "./pages/books/update.jsx";

function AppRouter() {
    const { logout, token } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const publicRoutes = ['/', '/login', '/signup'];

    const sessionToastShown = useRef(false);

    useEffect(() => {
        const onProtectedRoute = !publicRoutes.includes(location.pathname);

        if (!token && onProtectedRoute && location.pathname !== '/login') {
            if (!sessionToastShown.current) {
                toast.error('Session expired, please login again');
                sessionToastShown.current = true;
            }
            navigate('/login');
        }

        if (token) {
            sessionToastShown.current = false;
        }
    }, [token, location.pathname, navigate]);

    useEffect(() => {
        setLogoutCallback(() => {
            logout();
            toast.error('Session expired, please login again');
            navigate('/login');
        });
    }, [logout, navigate]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route element={<GuestRoute />}>
                    <Route path="signup" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="books">
                        <Route index element={<Index />} />
                        <Route path="add" element={<Create />} />
                        <Route path=":id" element={<Read />} />
                        <Route path=":id/edit" element={<Update />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </>
    )
}
