import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from "../api/apiClient.js";
import {useQuery} from "@tanstack/react-query";

export default function BookList() {
    const navigate = useNavigate();
    const {
        data: books = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const data = await apiClient.get('/api/books');
            return data;
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        keepPreviousData: true,
    })

    if (isLoading) return <span className="loading loading-spinner loading-xl"></span>;

    if (isError) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

    if (books.length === 0)
        return (
            <div className="text-center mt-10 flex justify-center flex-col gap-3">
                <p>No books found. Time to add some!</p>
                <div className="flex justify-center">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/books/add')}
                    >
                        Add now!
                    </button>
                </div>
            </div>
        );

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-7xl flex items-center justify-between mb-4 px-2 sm:px-0">
                <h1 className="text-2xl font-bold">Your Books</h1>
                <Link to="/books/add" className="btn btn-primary">
                    Add
                </Link>
            </div>
            <div className="card w-full max-w-7xl px-4 shadow-2xl bg-base-100">
                <ul className="list rounded-box">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase">
                        Saved books in your collection
                    </li>
                    {books.map(({ _id, title, author, year, genre, coverImageUrl, readStatus }) => (
                        <li
                            key={_id}
                            className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 sm:gap-x-4 items-center sm:items-start p-4 border-b last:border-b-0"
                        >
                            <div className="flex-shrink-0">
                                {coverImageUrl ? (
                                    <img
                                        src={coverImageUrl}
                                        alt={`Cover of ${title}`}
                                        className="w-24 h-24 rounded-box object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-box bg-base-200 flex items-center justify-center text-xs text-base-content opacity-50">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <div className="font-semibold text-lg">{title}</div>
                                <div className="text-xs uppercase font-medium opacity-60 mt-1">
                                    {author} &mdash; {year} &mdash; {genre || "No Genre"}
                                </div>
                                <div className="text-xs mt-1">
                                    Status: <span className="capitalize">{readStatus || "Unknown"}</span>
                                </div>
                            </div>

                            <div className="flex gap-1 mt-2 sm:mt-0">
                                <button
                                    className="btn btn-square btn-ghost"
                                    onClick={() => navigate(`/books/${_id}`)}
                                    aria-label={`View details of ${title}`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 3L20 12 6 21 6 3z" />
                                    </svg>
                                </button>
                                <button
                                    className="btn btn-square btn-ghost"
                                    onClick={() => alert('Feature coming soon')}
                                    aria-label="Feature coming soon"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
