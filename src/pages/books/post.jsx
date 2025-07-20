import AddBookForm from "../../components/bookForm.jsx";

export default function Post() {
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Add a New Book</h1>
            <AddBookForm />
        </div>
    )
}