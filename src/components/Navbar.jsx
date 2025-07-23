import { NavLink } from 'react-router-dom';
import { useAuth } from "../AuthContext.jsx";

export default function Navbar() {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn === null) return null;


    return (
        <>
            { isLoggedIn ? (
                <nav className="navbar" role="navigation" aria-label="Main">
                    <div className="flex-1">
                        <NavLink to="/" className="text-base-content text-xl font-bold">
                            Book Ai
                        </NavLink>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <NavLink to="/dashboard" className="text-base-content hover:text-primary">
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            ): (
                <nav className="navbar" role="navigation" aria-label="Main">
                    <div className="flex-1">
                        <NavLink to="/" className="text-base-content text-xl font-bold">
                            Book Ai
                        </NavLink>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `text-base-content hover:text-primary ${isActive ? "font-semibold" : ""}`
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) =>
                                        `text-base-content hover:text-primary ${isActive ? "font-semibold" : ""}`
                                    }
                                >
                                    Sign up
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            )}
        </>
    );
}
