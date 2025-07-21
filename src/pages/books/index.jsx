import BookList from "../../components/BookList.jsx";

export default function Index() {
    return (
        <div className="bg-base-200 min-h-screen text-base-content">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Books</h1>
            <BookList />
        </div>
    )
}
