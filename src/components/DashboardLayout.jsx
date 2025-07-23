import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs.jsx";

export default function DashboardLayout() {
    return (
        <div className="drawer lg:drawer-open bg-base-300 text-base-content">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col min-h-screen">
                <div className="w-full shadow-sm bg-base-100 px-4 lg:hidden">
                    <div className="flex items-center h-16">
                        <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden mr-2">
                            ☰
                        </label>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto bg-base-200 p-4">
                    <Breadcrumbs />
                    <Outlet />
                </main>
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                <Sidebar />
            </div>
        </div>
    );
}
