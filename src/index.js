import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import reducers from './reducers/index';
import { addToCart } from './actions/cartActions';
import { postBook, updateBook, deleteBook } from './actions/booksActions';

//Step 3 - define the reducers

// Step 1 - create the store
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware( logger ),
));

// store.subscribe(() => {
//     console.log( 'current state is: ',  store.getState());
// });

// Step 2 - Create and dispatch the actions
store.dispatch( postBook(
    [
        {
            id: 1,
            title: " This is the title of a Book",
            description: "This is some description about the book!!",
            price: 40
        },
        {
            id: 2,
            title: " This is the title of the second Book",
            description: "This is some description about the second book!!",
            price: 32
        }
    ]
) );

//Delete a book
store.dispatch( deleteBook(
    {
        id: 2
    }
) );

//update a book
store.dispatch( updateBook(
    {
        id: 3,
        title: 'This is the new title provided by the update action!' 
    }
));

// Cart actions
// Add to cart
store.dispatch( addToCart( [{ id: 1}] ) );