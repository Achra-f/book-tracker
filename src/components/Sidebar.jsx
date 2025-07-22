import { NavLink } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';

export default function Sidebar() {
    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-base-300 text-base-content p-4 z-20 shadow-md">
            <h2 className="text-2xl font-bold mb-4 px-2">Book Ai</h2>

            <ul className="menu rounded-box w-full flex gap-2">
                <NavItem to="/dashboard" label="Dashboard" end />
                <NavItem to="/books" label="Books" end />
                <NavItem label="Profile" comingSoon />
                <NavItem label="Settings" comingSoon />
            </ul>

            <Toaster />
        </aside>
    );
}

function NavItem({ to, label, icon, end = false, comingSoon = false }) {
    const showToast = () => {
        toast.loading("Coming soon", { duration: 2000 });
    };

    if (comingSoon) {
        return (
            <li>
                <button
                    onClick={showToast}
                    className="block w-full px-4 py-2 rounded-lg hover:bg-base-200 text-left text-sm text-base-content/60"
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
                end={end}
                className={({ isActive }) =>
                    `block w-full px-4 py-2 rounded-lg transition 
                     ${isActive ? "bg-base-100 font-semibold" : "hover:bg-base-200"}`
                }
            >
                {icon}
                <span>{label}</span>
            </NavLink>
        </li>
    );
}

