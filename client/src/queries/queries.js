import { gql } from '@apollo/client';

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const addAuthorMutation = gql`
    mutation AddAuthor($name: String!, $age: Int!){
        addAuthor(name: $name, age: $age){
            name
            id
        }
    }
`;

const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;

const getAuthorQuery = gql`
    query GetAuthor($id: ID){
        author(id: $id) {
            id
            name
            age
            books {
                name
                genere
            }
        }
    }
`;

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
        draft @client
    }
`;

const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`;

export { addBookMutation, addAuthorMutation, getAuthorsQuery, getBooksQuery, getBookQuery, getAuthorQuery };
