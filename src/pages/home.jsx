import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div
            className="text-center px-4"
        >
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">Hello there</h1>
                <p className="py-6">
                    Track your reading journey with ease.
                    Stay organized, discover new favorites, and never lose sight of your next great read. Your personal book tracker — simple, smart, and made for readers like you.
                </p>
                <Link  className="btn btn-primary" to="/login">Get Started</Link>
            </div>
        </div>
    );
}
