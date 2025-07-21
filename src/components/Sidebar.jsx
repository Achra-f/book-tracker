import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-base-300 text-base-content p-4">
            <h2 className="text-2xl font-bold mb-4 px-2">Dashboard</h2>

            <ul className="menu rounded-box w-full flex gap-2">
                <NavItem to="/books" label="Books" end />
                <NavItem to="/books/add" label="Add Book" />
                {/* Future links */}
                {/* <NavItem to="/profile" label="Profile" /> */}
                {/* <NavItem to="/settings" label="Settings" /> */}
            </ul>
        </aside>
    );
}

function NavItem({ to, label, icon, end = false }) {
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

