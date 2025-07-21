import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import Index from './pages/books/index.jsx';
import Home from './pages/home.jsx';
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Post from "./pages/books/post.jsx";
import GuestRoute from "./routes/GuestRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route element={<GuestRoute />}>
                        <Route path="signup" element={<Register />} />
                        <Route path="login" element={<Login />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute />} >
                    <Route path="/books" element={<DashboardLayout />} >
                        <Route index element={<Index />} />
                        <Route path="add" element={<Post />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
