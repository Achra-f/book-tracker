import Sidebar from "./Sidebar.jsx";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-base-300 text-base-content">
            <Sidebar />
            <div className="ml-64 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 overflow-y-auto bg-base-200 p-4">
                    <Breadcrumbs />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
