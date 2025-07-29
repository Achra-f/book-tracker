import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "../AuthContext.jsx";

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="h-screen w-64 bg-base-300 text-base-content p-4 z-20 shadow-md flex flex-col">
            <div className="mb-6 px-2">
                <h2 className="text-2xl font-bold tracking-tight">📚 Book Ai</h2>
            </div>
            <nav className="flex-1">
                <ul className="menu gap-1">
                    <NavItem to="/dashboard" label="Dashboard" />
                    <NavItem to="/discover" label="Discover" />
                    <NavItem label="Profile" comingSoon />
                    <NavItem label="Settings" comingSoon />
                </ul>
            </nav>
            <div className="mt-auto">
                <ul className="menu">
                    <li>
                        <button
                            onClick={handleLogout}
                            className="btn btn-sm btn-ghost text-base-content hover:text-error"
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

function NavItem({ to, label, icon, comingSoon = false }) {
    const showToast = () => {
        toast.loading("Coming soon", { duration: 2000 });
    };

    if (comingSoon) {
        return (
            <li>
                <button
                    onClick={showToast}
                    className="btn btn-ghost justify-start text-left text-base-content/60"
                >
                    {icon}
                    <span>{label}</span>
                </button>
            </li>
        );
    }

    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `btn btn-ghost justify-start text-left ${
                        isActive ? "bg-base-200 font-semibold" : "hover:bg-base-100"
                    }`
                }
            >
                {icon}
                <span>{label}</span>
            </NavLink>
        </li>
    );
}
