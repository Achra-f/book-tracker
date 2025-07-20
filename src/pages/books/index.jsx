import { useState, useEffect } from 'react';
import { BOOKS_URL } from "../../api.js";
import { useNavigate } from "react-router-dom";

export default function Index() {
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

        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }

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

  if (loading)
    return <p className="text-center mt-10">Loading your books...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (books.length === 0)
    return (
        <>
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
        </>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center">Your Books</h1>
        <ul className="space-y-4">
          {books.map(({ _id, title, author, year, genre, coverImageUrl, readStatus }) => (
              <li
                  key={_id}
                  className="border border-gray-300 rounded-md p-4 hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  <p className="text-gray-700">
                    {author} &mdash; {year} &mdash; <em>{genre || 'No genre'}</em>
                  </p>
                  <p className="mt-1 font-medium">
                    Status: <span className="capitalize">{readStatus || 'Unknown'}</span>
                  </p>
                </div>

                {coverImageUrl ? (
                    <img
                        src={coverImageUrl}
                        alt={`Cover of ${title}`}
                        className="w-24 h-32 object-cover rounded-md"
                    />
                ) : (
                    <div className="w-24 h-32 bg-gray-200 flex items-center justify-center rounded-md text-gray-400">
                      No Image
                    </div>
                )}
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
