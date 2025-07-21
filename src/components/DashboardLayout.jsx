import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen bg-base-300 text-base-content">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto bg-base-200 p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
