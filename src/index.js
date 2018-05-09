import { createStore } from 'redux';

import reducers from './reducers/index';

//Step 3 - define the reducers

// Step 1 - create the store
const store = createStore( reducers );
store.subscribe(() => {
    console.log( 'current state is: ',  store.getState());
});

// Step 2 - Create and dispatch the actions
store.dispatch({
    type: "POST_BOOK",
    payload: [
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
}); 

// Dispatch a second action - Update Operation
store.dispatch({
    type: "POST_BOOK",
    payload: 
    [   {
            id: 3,
            title: " This is the title of the third Book",
            description: "This is some description about the third book!!",
            price: 60
        }
    ]
});

//Delete a book
store.dispatch({
    type: "DELETE_BOOK",
    payload:{
        id: 2
    }
});

//Update a book
store.dispatch({
    type: "UPDATE_BOOK",
    payload:{
        id: 3,
        title: 'This is the new title provided by the update action!' 
    }
})