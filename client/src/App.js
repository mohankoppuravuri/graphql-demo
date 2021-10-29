import React, { Component } from 'react';
import { ApolloClient } from '@apollo/client/core';
import { ApolloProvider,  InMemoryCache, } from '@apollo/client'
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';
import { draft }  from  './reactiveVariables'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            draft: {
              read(_, { variables }) {
                return draft();
              }
            }
          }
        }
      }
    })
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1>Book Shop</h1>
                <BookList />
                <AddBook />
                <AddAuthor />
            </div>
        </ApolloProvider>
    );
  }
}

export default App;
