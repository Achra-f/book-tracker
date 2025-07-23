import React from "react";
import BookDetails from "../../components/BookDetails.jsx";
import PageTitle from "../../components/PageTitle.jsx";

const Read = () => {
    return (
        <>
            <PageTitle title="Books - Book AI" />
            <div className="bg-base-200 min-h-screen text-base-content">
                <BookDetails />
            </div>
        </>
    );
};

export default Read;
