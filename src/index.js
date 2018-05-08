import { createStore } from 'redux';

//Step 3 - define the reducers
const reducer = ( state = { books:[] }, action ) => {
    switch( action.type ){

        case "POST_BOOK":
            let books = state.books.concat( action.payload );
            return { books };
            break;
        
        case "DELETE_BOOK":
            const currentBookToDelete = [ ...state.books ];
            const indexToDelete = currentBookToDelete.findIndex(( book ) => {
                return book.id === action.payload.id;
            }); 
            return { 
                books: [
                    ...currentBookToDelete.slice(0, indexToDelete), 
                    ...currentBookToDelete.slice( indexToDelete + 1 )
                ]
            }
            break;

        case "UPDATE_BOOK": 
            const currentBookToUpdate = [ ...state.books ];
            const indexToUpdate = currentBookToUpdate.findIndex(( book ) => {
                return book.id === action.payload.id
            });
            const newBookToUpdate = {
                ...currentBookToUpdate[ indexToUpdate ],
                title: action.payload.title
            }
            console.log( newBookToUpdate );
            return {
                books: [
                    ...currentBookToUpdate.slice( indexToUpdate + 1 )
                ]
            };
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

//Delete a book
store.dispatch({
    type: "DELETE_BOOK",
    payload:{
        id: 3
    }
});

//Update a book
store.dispatch({
    type: "UPDATE_BOOK",
    payload: {
        payload:{
            id: 2,
            title: 'This is the new title provided by the update action!' 
        }
    }
})