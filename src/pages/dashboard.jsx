import { Link } from "react-router-dom";
import React from "react";
import PageTitle from "../components/PageTitle.jsx";

export default function Dashboard() {
    return (
        <>
            <PageTitle title="Dashboard - Book AI" />
            <div className="hero rounded-xl p-6 mb-6">
                <div className="hero-content flex flex-col items-center gap-6 lg:flex-row lg:items-start">
                    <img
                        src="https://img.icons8.com/color/96/book.png"
                        className="max-w-[96px] rounded-lg"
                        alt="Books"
                    />
                    <div className="text-center lg:text-left max-w-md">
                        <h1 className="text-3xl font-bold">Welcome to your Library</h1>
                        <p className="py-2 text-base-content/70">
                            Organize your reading list, track your progress, and discover new books.
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-center gap-3 ">
                            <Link to="/books/add" className="btn btn-primary w-full sm:w-auto">
                                Add New Book
                            </Link>
                            <Link to="/books" className="btn btn-outline w-full sm:w-auto">
                                View Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
