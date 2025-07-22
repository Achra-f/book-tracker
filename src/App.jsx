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
import {useEffect} from "react";
import {setLogoutCallback} from "./api/apiClient.js";
import toast, {Toaster} from 'react-hot-toast';
import Read from "./pages/books/read.jsx";
import Dashboard from "./pages/dashboard.jsx";

function AppRouter() {
    const { logout, token } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const publicRoutes = ['/', '/login', '/signup'];

    useEffect(() => {
        if (!token && !publicRoutes.includes(location.pathname)) {
            toast.error('Session expired, please login again');
            navigate("/login");
        }
    }, [token, navigate]);

    useEffect(() => {
        setLogoutCallback(() => {
            logout();
            toast.error('Session expired, please login again');
            navigate('/login');
        });
    }, [logout, navigate]);

    useEffect(() => {
        if (token) {
            toast.success('Log in succeeded');
        }
    }, [token]);

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
