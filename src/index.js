import { createStore } from 'redux';

//Step 3 - define the reducers
const reducer = ( state = { books:[] }, action ) => {
    switch( action.type ){
        case "POST_BOOK":
            let books = state.books.concat( action.payload );
            return { books };
            break;
    }

    return state;
}

// Step 1 - create the store
const store = createStore( reducer );
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