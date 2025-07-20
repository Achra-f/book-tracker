import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext.jsx"

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between">
            <a className="btn btn-ghost text-xl" href="/">Book app</a>

            <div className="flex flex-col gap-5 sm:flex-row">
                {!isLoggedIn && (
                    <>
                        <Link to="/login" className="link link-primary">Login</Link>
                        <Link to="/signup" className="link link-primary">Sign up me</Link>
                    </>
                )}

                {isLoggedIn && (
                    <button className="btn btn-ghost" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
}
