import React, { useState } from "react";
import { bookCreateSchema } from "../validation/bookSchema.js";
import { BOOKS_URL } from "../api.js";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        genre: '',
        coverImageUrl: '',
        readStatus: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const onChange = (e)  => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const parsedData = {
                ...formData,
                year: Number(formData.year),
            };

            bookCreateSchema.parse(parsedData);
            setErrors({});
            setLoading(true);

            const res = await fetch(BOOKS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(parsedData),
            })

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to add book');
            }

            navigate('/books');
        } catch (err) {
            if (err.errors) {
                const zodErrors = err.errors;
                err.errors.forEach(e => {
                    zodErrors[e.path[0]] = e.message;
                });
                setErrors(zodErrors);
            } else {
                setErrors({ form: err.message });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl flex justify-center">
            <div className="p-4">
                <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-">
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
                            {loading ? 'Adding...' : 'Add Book'}
                        </button>
                        <a href="/books" className="link">Back</a>
                    </fieldset>

                </form>
            </div>
        </div>
    );
};

export default AddBookForm;
