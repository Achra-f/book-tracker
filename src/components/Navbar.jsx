import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext.jsx";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="flex-1">
                {!isLoggedIn && (
                    <Link to="/" className="btn btn-ghost text-xl">Book Ai</Link>
                )}
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {!isLoggedIn && (
                        <>
                            <li>
                                <Link to="/login" className="text-base-content hover:text-primary">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup" className="text-base-content hover:text-primary">Sign up</Link>
                            </li>
                        </>
                    )}

                    {isLoggedIn && (
                        <li>
                            <button onClick={handleLogout} className="btn btn-ghost">Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
