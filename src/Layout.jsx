import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

export default function Layout() {
    return (
        <div className="min-h-screen bg-base-100">
            <header className="border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <Navbar />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 flex justify-center items-center min-h-[calc(100vh-100px)]">
                <Outlet />
            </main>
        </div>
    );
}
