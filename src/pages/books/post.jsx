import AddBookForm from "../../components/AddBookForm.jsx";

export default function Post() {
    return (
        <div className="flex flex-col items-center bg-base-200 min-h-screen text-base-content">
            <h1 className="text-2xl font-bold mb-6 text-center">Add a New Book</h1>
            <AddBookForm />
        </div>
    )
}
