import React, { useState } from "react";
import BookForm from "../../components/BookForm.jsx";
import PageTitle from "../../components/PageTitle.jsx";
import { bookCreateSchema } from "../../validation/bookSchema.js";
import { apiClient } from "../../api/apiClient.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await apiClient.post("/api/books", data);
            toast.success("Book added successfully!");
            navigate("/books");
        } catch (error) {
            toast.error("Failed to add book: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <PageTitle title="Create - Book AI" />
            <div className="bg-base-200 text-base-content">
                <BookForm
                    onSubmit={onSubmit}
                    validationSchema={bookCreateSchema}
                    submitLabel="Add Book"
                    loading={loading}
                    backTo="/books"
                />
            </div>
        </>
    );
}
