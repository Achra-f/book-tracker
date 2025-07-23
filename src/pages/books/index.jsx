import BookList from "../../components/BookList.jsx";
import PageTitle from "../../components/PageTitle.jsx";
import React from "react";

export default function Index() {
    return (
        <>
            <PageTitle title="Books - Book AI" />
            <div className="bg-base-200 text-base-content">
                <BookList />
            </div>
        </>
    )
}
