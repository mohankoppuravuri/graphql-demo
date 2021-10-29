import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { getAuthorsQuery, addAuthorMutation } from '../queries/queries';

const AddAuthor = props => {
    const [authorDetails, setAuthorDetails] = useState({
        name: '',
        age: '',
    })
    // const getAuthorsQuery = useQuery(getAuthorsQuery);
    const [addAuthor, { loading } ] = useMutation (addAuthorMutation);

    const submitForm = (e) => {
        e.preventDefault()
        // use the addBookMutation
        addAuthor({
            variables: {
                name: authorDetails.name,
                age: Number (authorDetails.age),
            },
            refetchQueries: [{ query: getAuthorsQuery }]
        });
    }
    return(
        <form className="add-author" id="add-author" onSubmit={ submitForm } >
            <div className="field">
                <label>Author name:</label>
                <input type="text" onChange={ (e) => 
                    setAuthorDetails(prev => { 
                        return {
                            ...prev, 
                            name: e.target.value
                        } 
                    })
                } />
            </div>
            <div className="field">
                <label>Author age:</label>
                <input type="text" onChange={ (e) => 
                    setAuthorDetails(prev => { 
                        return {
                            ...prev, 
                            age: e.target.value
                        } 
                    })
                } />
            </div>
            <button>{loading ?'...' : '+'}</button>
        </form>
    );
}

export default AddAuthor;
