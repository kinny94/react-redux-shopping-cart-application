import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import logger from 'redux-logger';
import React from 'react';
import { render } from 'react-dom'; 
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import 'bootstrap';

import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBook, updateBook, deleteBook } from './actions/booksActions';

import Menu from './components/menu';
import Footer from './components/footer';
import Main from './components/main';

//Step 3 - define the reducers

// Step 1 - create the store
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware( ),
));

render(
    <Provider store={ store }>
        <BrowserRouter>
            <div>
                <Menu />
                <Main />
                <Footer />
            </div>
        </BrowserRouter>
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