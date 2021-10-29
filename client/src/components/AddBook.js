import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';
import { draft }  from  '../reactiveVariables'
import { getBookQuery } from "../queries/queries";

const AddBook  = (props) => {
    const [bookDetails,  setBookDetails] = useState ({
        name: '',
        genre: '',
        authorId: ''
    })
    const { data, loading } = useQuery(getAuthorsQuery);
    const [addBook, { loading: isAddingInProgess}] = useMutation(addBookMutation, {
        refetchQueries: [
                'bookDetails',
        ],
    });

    const displayAuthors = () => {
        if(loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }
    const submitForm = (e) => {
        e.preventDefault()
        if (e.target.id === 'draft') {
            return draft({
                name: bookDetails.name,
                genre: bookDetails.genre,
                authorId: bookDetails.authorId
            })
        }
        addBook({
            variables: {
                name: bookDetails.name,
                genre: bookDetails.genre,
                authorId: bookDetails.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    return(
        <form id="add-book" onSubmit={ submitForm } >
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={ (e) =>
                    setBookDetails(prev => { 
                        return {
                            ...prev, 
                            name: e.target.value
                        } 
                    })
                }
                />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={ (e) => 
                    setBookDetails(prev => { 
                        return {
                            ...prev, 
                            genre: e.target.value
                        } 
                    })
                }
                />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={ (e) => 
                        setBookDetails(prev => { 
                            return {
                                ...prev, 
                                authorId: e.target.value
                            } 
                        })
                    }>
                    <option>Select author</option>
                    { displayAuthors() }
                </select>
            </div>
            <button type = "div" id="submit" onClick={submitForm}>{ isAddingInProgess ? '...' : '+'}</button>
            <button type = "div" id='draft' onClick={submitForm}>Draft</button>
        </form>
    );
}

export default AddBook;
