import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BookForm = ({
                      onSubmit,
                      initialData = {},
                      submitLabel = "Add Book",
                      loading = false,
                      validationSchema,
                      backTo = "/books",
                  }) => {
    const [formData, setFormData] = useState(() => ({
        title: '',
        author: '',
        year: '',
        genre: '',
        coverImageUrl: '',
        readStatus: '',
        ...initialData,
    }));

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (Object.keys(initialData).length > 0) {
            setFormData({
                title: '',
                author: '',
                year: '',
                genre: '',
                coverImageUrl: '',
                readStatus: '',
                ...initialData,
            });
        }
    }, [initialData]);


    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedData = {
            ...formData,
            year: formData.year === "" ? undefined : Number(formData.year),
            coverImageUrl: formData.coverImageUrl?.trim() || undefined,
        };

        try {
            if (validationSchema) validationSchema.parse(parsedData);
            setErrors({});
            await onSubmit(parsedData);
        } catch (err) {
            if (err.errors) {
                const zodErrors = {};
                err.errors.forEach((e) => {
                    zodErrors[e.path[0]] = e.message;
                });
                setErrors(zodErrors);
            } else {
                toast.error("Unexpected error: " + err.message);
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{submitLabel}</h1>
                <Link to={backTo} className="btn btn-primary">
                    Back
                </Link>
            </div>
            <div className="card bg-base-100 w-full max-w-md shadow-2xl">
                <div className="p-4">
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
                        {errors.form && <p className="text-red-500">{errors.form}</p>}
                        <fieldset className="fieldset">
                            <label className="label">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={onChange}
                                className="input"
                                required
                            />
                            {errors.title && <p className="text-red-500">{errors.title}</p>}

                            <label className="label">Author</label>
                            <input
                                name="author"
                                value={formData.author}
                                onChange={onChange}
                                className="input"
                                required
                            />
                            {errors.author && <p className="text-red-500">{errors.author}</p>}

                            <label className="label">Year</label>
                            <input
                                name="year"
                                type="number"
                                value={formData.year}
                                onChange={onChange}
                                className="input"
                                required
                            />
                            {errors.year && <p className="text-red-500">{errors.year}</p>}

                            <label className="label">Genre</label>
                            <input
                                name="genre"
                                value={formData.genre}
                                onChange={onChange}
                                className="input"
                            />

                            <label className="label">Cover Image URL</label>
                            <input
                                name="coverImageUrl"
                                value={formData.coverImageUrl}
                                onChange={onChange}
                                className="input"
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.coverImageUrl && <p className="text-red-500">{errors.coverImageUrl}</p>}

                            <label className="label">Read status</label>
                            <select
                                name="readStatus"
                                value={formData.readStatus}
                                onChange={onChange}
                                className="select"
                            >
                                <option value="">Select status</option>
                                <option value="reading">Reading</option>
                                <option value="finished">Finished</option>
                                <option value="want to read">Want to read</option>
                            </select>
                            {errors.readStatus && <p className="text-red-500">{errors.readStatus}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-success mt-4"
                            >
                                {loading ? `${submitLabel}...` : submitLabel}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookForm;
