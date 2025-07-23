import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiClient } from "../api/apiClient.js";
import {useNavigate} from "react-router-dom";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        if (book) {
            document.title = `${book.title} | ${book.author} | ${book.genre}`;
        } else  {
            document.title = "Loading book...";
        }
    }, [book]);


    const deleteBook = async () => {
        try {
            await apiClient.delete(`/api/books/${id}`);
            navigate("/books");
        } catch (error) {
            setError("Failed to delete book: " + error.message);
        }
    }

    if (loading) return <div className="text-center mt-10">Loading book details...</div>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!book) return <p className="text-center mt-10 text-gray-500">Book not found</p>;

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold tooltip tooltip-bottom" data-tip={book.title}>{book.title.length > 60 ? book.title.slice(0, 60) + '…' : book.title}</h1>
                <Link to="/books" className="btn btn-primary">Back</Link>
            </div>
            <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
                {book.coverImageUrl && (
                    <figure>
                        <img src={book.coverImageUrl} alt={book.title} className="max-h-80 w-auto rounded-lg shadow" />
                    </figure>
                )}

                <div className="card-body">
                    <div className="flex justify-between">
                        <div className="flex flex-wrap gap-2 lg:flex-col">
                            <div className="badge badge-soft badge-primary">
                                {book.author}
                            </div>
                            <div className="badge badge-soft badge-secondary">
                                {book.year}
                            </div>
                            <div className="badge badge-soft badge-accent">
                                {book.genre}
                            </div>
                            <div className="badge badge-soft badge-info">
                                <span className="capitalize">{book.readStatus}</span>
                            </div>
                        </div>

                        <div className="flex justify-end flex-col">
                            <div className="flex gap-1 flex-col sm:flex-row">
                                <Link
                                    className="btn btn-info btn-sm"
                                    to={`/books/${book._id}/edit`}
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => document.getElementById('confirm_delete_modal').showModal()}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <dialog id="confirm_delete_modal" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Delete</h3>
                    <p className="py-4">Are you sure you want to delete this book?</p>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={() => document.getElementById('confirm_delete_modal').close()}>
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-error"
                            onClick={() => {
                                deleteBook(book.id);
                                document.getElementById('confirm_delete_modal').close();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default BookDetails;
