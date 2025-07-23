import React, { useState, useEffect } from "react";
import BookForm from "../../components/BookForm.jsx";
import PageTitle from "../../components/PageTitle.jsx";
import { bookUpdateSchema } from "../../validation/bookSchema.js";
import { apiClient } from "../../api/apiClient.js";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [someBookData, setSomeBookData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingBook, setLoadingBook] = useState(true);

    useEffect(() => {
        async function fetchBook() {
            setLoadingBook(true);
            try {
                const response = await apiClient.get(`/api/books/${id}`);
                setSomeBookData(response);
                console.log("Fetched book data:", response.data);
                console.log("Fetched book data:", response);
            } catch (error) {
                toast.error("Failed to load book data: " + error.message);
                navigate("/books");
            } finally {
                setLoadingBook(false);
            }
        }
        fetchBook();
    }, [id, navigate]);

    const handleSubmit = async (data) => {
        setIsLoading(true);
        try {
            await apiClient.patch(`/api/books/${id}`, data);
            toast.success("Book updated successfully!");
            navigate("/books");
        } catch (error) {
            toast.error("Failed to update book: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (loadingBook) {
        return <div>Loading book data...</div>;
    }

    return (
        <>
            <PageTitle title="Update - Book AI" />
            <div className="bg-base-200 text-base-content">
                <BookForm
                    onSubmit={handleSubmit}
                    initialData={someBookData}
                    submitLabel="Update Book"
                    loading={isLoading}
                    validationSchema={bookUpdateSchema}
                    backTo={`/books/${someBookData._id}`}
                />
            </div>
        </>
    );
}
