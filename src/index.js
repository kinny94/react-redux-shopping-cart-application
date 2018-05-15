import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import logger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom'; 
import { Provider } from 'react-redux';
import 'bootstrap';

import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBook, updateBook, deleteBook } from './actions/booksActions';

//Step 3 - define the reducers

// Step 1 - create the store
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware( ),
));

import BookList from './components/pages/booksList';
render(
    <Provider store={ store }>
        <div className="container">
            <BookList />
        </div>
    </Provider>,
    document.getElementById('app')
)

// Step 2 - Create and dispatch the actions
// store.dispatch( postBook(
    
// ) );

// //Delete a book
// store.dispatch( deleteBook(
//     {
//         id: 2
//     }
// ) );

// //update a book
// store.dispatch( updateBook(
//     {
//         id: 3,
//         title: 'This is the new title provided by the update action!' 
//     }
// ));

// // Cart actions
// // Add to cart
// store.dispatch( addToCart( [{ id: 1}] ) );