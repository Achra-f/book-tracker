import React from "react";
import BookForm from "../../components/BookForm.jsx";
import PageTitle from "../../components/PageTitle.jsx";
import { bookUpdateSchema } from "../../validation/bookSchema.js";
import { apiClient } from "../../api/apiClient.js";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: someBookData, isLoading: loadingBook, isError, error } = useQuery({
        queryKey: ["book", id],
        queryFn: () => apiClient.get(`/api/books/${id}`),
        onError: (err) => {
            toast.error("Failed to load book data: " + err.message);
            navigate("/books");
        },
    });

    const mutation = useMutation({
        mutationFn: async (updatedBook) => {
            const response = await apiClient.patch(`/api/books/${id}`, updatedBook);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Book updated successfully!");
            queryClient.invalidateQueries(["books"]);
            queryClient.invalidateQueries(["book", id]);
            navigate("/books");
        },
        onError: (error) => {
            toast.error("Failed to update book: " + error.message);
        }
    });

    const handleSubmit = async (data) => {
        await mutation.mutateAsync(data);
    };

    if (loadingBook) return <div>Loading book data...</div>;
    if (isError) return <div>Error loading book: {error.message}</div>;

    return (
        <>
            <PageTitle title="Update - Book AI" />
            <div className="bg-base-200 text-base-content">
                <BookForm
                    onSubmit={handleSubmit}
                    initialData={someBookData}
                    submitLabel="Update Book"
                    loading={mutation.isLoading}
                    validationSchema={bookUpdateSchema}
                    backTo={`/books/${someBookData._id}`}
                />
            </div>
        </>
    );
}
