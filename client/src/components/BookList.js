import React, { useState } from 'react';
import { getBooksQuery } from '../queries/queries';
import { useQuery } from '@apollo/client';
import { NetworkStatus } from '@apollo/client';


// components
import BookDetails from './BookDetails';
import { doTypesOverlap } from 'graphql';

const BookList = (props) => {
    const [selected, setSelected] = useState(null);
    const { loading, data, networkStatus, error, refetch } = useQuery(getBooksQuery, {
        // pollInterval: 50000,
        errorPolicy: 'all',
        // fetchPolicy: "network-only",   // Used for first execution
        // nextFetchPolicy: "cache-first"
    });
    const displayBooks = () => {
        if(loading){
            return( <div>Loading books...</div> );
        } else {
            const draft  = data.draft ? <li> <h5> drafted state</h5>{ data.draft.name }</li> : null
            let books = data.books.map(book => {
                return(
                    <li key={ book.id } onClick={ (e) => setSelected(book.id) }>{ book.name }</li>
                );
            })
            return [...books, draft]
        }
    };
    if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
    return(
        <div>
            <ul id="book-list">
                { displayBooks() }
            </ul>
            {/* <BookDetails bookId={ selected } /> */}
        </div>
    );
}

export default BookList;
