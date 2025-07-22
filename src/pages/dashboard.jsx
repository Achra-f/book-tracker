import {Link} from "react-router-dom";
import React from "react";

export default function Dashboard() {
    return (
        <div className="hero rounded-xl p-6 mb-6">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="https://img.icons8.com/color/96/book.png"
                    className="max-w-[96px] rounded-lg"
                    alt="Books"
                />
                <div>
                    <h1 className="text-3xl font-bold">Welcome to your Library</h1>
                    <p className="py-2 text-base-content/70">
                        Organize your reading list, track your progress, and discover new books.
                    </p>
                    <div className="mt-4">
                        <Link to="/books/add" className="btn btn-primary mr-2">Add New Book</Link>
                        <Link to="/books/" className="btn btn-outline mr-2">View Collection</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
