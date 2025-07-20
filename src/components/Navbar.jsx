import { Link } from 'react-router-dom';

export default function Navbar() {
    const token = localStorage.getItem('token');
    const loggedIn = Boolean(token);

    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between">
            <a className="btn btn-ghost text-xl" href="/">Book app</a>

            <div className="flex flex-col gap-5 sm:flex-row">
                {!loggedIn && (
                    <>
                        <Link to="/login" className="link link-primary">Login</Link>
                        <Link to="/signup" className="link link-primary">Sign up me</Link>
                    </>
                )}

                {loggedIn && (
                    <>
                        <button
                            className="btn btn-ghost"
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
