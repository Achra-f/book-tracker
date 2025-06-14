import { useState, useEffect } from 'react';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/books', {
          headers: {
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
      <p className="text-center mt-10">No books found. Time to add some!</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Books</h1>
      <ul className="space-y-4">
        {books.map(({ _id, title, author, year, genre, readStatus }) => (
          <li
            key={_id}
            className="border border-gray-300 rounded-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-700">
              {author} &mdash; {year} &mdash; <em>{genre || 'No genre'}</em>
            </p>
            <p className="mt-1 font-medium">
              Status:{' '}
              <span className="capitalize">{readStatus || 'Unknown'}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
