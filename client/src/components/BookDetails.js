import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

const BookDetails = (props) => {
  const { data, error, loading, } = useQuery(getBookQuery, {
    name: 'bookDetails',
    variables: {
      id: props.bookId,
    },
    errorPolicy: "all",
    // pollInterval: 500
  });

  const displayBookDetails = () => {
    if (loading)
        return "Loading ..."

    if (data.book) {
      return (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {data.book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
