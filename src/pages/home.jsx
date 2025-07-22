import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    return(
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            Track your reading journey with ease. 
                            Stay organized, discover new favorites, and never lose sight of your next great read. Your personal book tracker — simple, smart, and made for readers like you.
                        </p>
                        <button className="btn btn-primary" onClick={() => navigate('/books')}>Get Started</button>
                    </div>
                </div>
            </div>
        </>
    )
}