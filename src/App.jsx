import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Index from './pages/books/index.jsx';
import Home from './pages/Home.jsx';
import ProtectedRoute from "./ProtectedRoute.jsx";
import Post from "./pages/books/post.jsx";
import GuestRoute from "./GuestRoute.jsx";

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

                    <Route element={<ProtectedRoute />} >
                        <Route path="books" element={<Index />} />
                        <Route path="books/add" element={<Post />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
