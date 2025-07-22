import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";

export default function Breadcrumbs() {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);

    const [bookTitle, setBookTitle] = useState(null);
    const [loadingTitle, setLoadingTitle] = useState(false);

    const isAddBookPage = segments[0] === "books" && segments[1] === "add";
    const isBookDetailPage = segments[0] === "books" && segments.length === 2 && segments[1] !== "add";

    const bookId = isBookDetailPage ? segments[1] : null;

    useEffect(() => {
        if (!bookId) {
            setBookTitle(null);
            return;
        }
        setLoadingTitle(true);
        apiClient
            .get(`/api/books/${bookId}`)
            .then((data) => setBookTitle(data.title))
            .catch(() => setBookTitle("Book Details"))
            .finally(() => setLoadingTitle(false));
    }, [bookId]);

    // No breadcrumbs on the public landing page "/"
    if (segments.length === 0) return null;

    // Helper to format label nicely
    const formatLabel = (label) =>
        label.charAt(0).toUpperCase() + label.slice(1);

    return (
        <nav className="breadcrumbs text-sm mb-4" aria-label="Breadcrumb">
            <ul>
                {/* Dashboard crumb */}
                {segments[0] === "dashboard" && segments.length === 1 ? (
                    <li aria-current="page">Dashboard</li>
                ) : (
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                )}

                {/* Books section crumbs */}
                {segments[0] === "books" && (
                    <>
                        <li>
                            <Link to="/books">Books</Link>
                        </li>

                        {isAddBookPage && <li aria-current="page">Add</li>}

                        {isBookDetailPage && (
                            <li aria-current="page">
                                {loadingTitle ? "Loading..." : bookTitle || "Book Details"}
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
}
