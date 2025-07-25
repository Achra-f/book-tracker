import React from "react";
import BookForm from "../../components/BookForm.jsx";
import PageTitle from "../../components/PageTitle.jsx";
import { bookCreateSchema } from "../../validation/bookSchema.js";
import { apiClient } from "../../api/apiClient.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Create() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newBook) => apiClient.post("/api/books", newBook),
        onSuccess: () => {
            toast.success("Book added successfully!");
            queryClient.invalidateQueries({ queryKey: ['books'] });
            navigate("/books");
        },
        onError: (error) => {
            toast.error("Failed to add book: " + error.message);
        },
    });

    const onSubmit = async (data) => {
        await mutation.mutateAsync(data);
    };

    return (
        <>
            <PageTitle title="Create - Book AI" />
            <div className="bg-base-200 text-base-content">
                <BookForm
                    onSubmit={onSubmit}
                    validationSchema={bookCreateSchema}
                    submitLabel="Add Book"
                    loading={mutation.isLoading}
                    backTo="/books"
                />
            </div>
        </>
    );
}
