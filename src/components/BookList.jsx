import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {BOOKS_URL} from "../api.js";

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(BOOKS_URL, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Failed to fetch books');

                const data = await res.json();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [token]);

    if (loading) return <p className="text-center mt-10">Loading your books...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

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
        <div className="max-w-4xl mx-auto p-4">
            <ul className="list bg-base-100 rounded-box shadow-md">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide uppercase">
                    Saved books in your collection
                </li>

                {books.map(({ _id, title, author, year, genre, coverImageUrl, readStatus }) => (
                    <li key={_id} className="list-row gap-4 items-center">
                        {/* Book Cover */}
                        <div>
                            {coverImageUrl ? (
                                <img
                                    src={coverImageUrl}
                                    alt={`Cover of ${title}`}
                                    className="size-12 rounded-box object-cover"
                                />
                            ) : (
                                <div className="size-12 rounded-box bg-base-200 flex items-center justify-center text-xs text-base-content opacity-50">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* Book Details */}
                        <div className="flex-1">
                            <div className="font-semibold">{title}</div>
                            <div className="text-xs uppercase font-medium opacity-60">
                                {author} &mdash; {year} &mdash; {genre || "No Genre"}
                            </div>
                            <div className="text-xs mt-1">
                                Status: <span className="capitalize">{readStatus || "Unknown"}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1">
                            <button className="btn btn-square btn-ghost" onClick={() => navigate(`/books/${_id}`)}>
                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="none" stroke="currentColor">
                                        <path d="M6 3L20 12 6 21 6 3z" />
                                    </g>
                                </svg>
                            </button>
                            <button className="btn btn-square btn-ghost" onClick={() => alert('Feature coming soon')}>
                                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="none" stroke="currentColor">
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
