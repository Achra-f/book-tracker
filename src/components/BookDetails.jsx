import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "../api/apiClient.js";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await apiClient.get(`/api/books/${id}`);
                setBook(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading book details...</div>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!book) return <p className="text-center mt-10 text-gray-500">Book not found</p>;

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <Link to="/books" className="btn btn-primary">Back</Link>
            </div>
            <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
                {book.coverImageUrl && (
                    <figure>
                        <img src={book.coverImageUrl} alt={book.title} className="max-h-80 w-auto rounded-lg shadow" />
                    </figure>
                )}

                <div className="card-body">
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Year:</strong> {book.year}</p>
                    {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
                    {book.readStatus && (
                        <p>
                            <strong>Status:</strong>{' '}
                            <span className="capitalize">{book.readStatus}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default BookDetails;
