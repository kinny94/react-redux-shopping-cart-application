
export function booksReducers( state = { 
        books: [] 
    }, action ){
    switch( action.type ){

        case "GET_BOOKS":
        
            return {
                ...state, books: [...action.payload ]
            }

        case "POST_BOOK":
            let books = state.books.concat( action.payload );
            return { 
                    ...state, 
                    books,
                    msg: 'Saved! Click to continue',
                    style: 'btn btn-success btn-lg float-none'
                };
            break;

        case "POST_BOOK_REJECTED":
            return {
                ...state,
                msg: 'Please, try again!!',
                style: 'btn btn-danger btn-lg float-none'
            }
            break;

        case "RESET_BUTTON":
            return{
                ...state,
                msg: null,
                style: 'btn btn-secondary btn-lg float-none'
            }
            break;
        
        case "DELETE_BOOK":
            const currentBookToDelete = [ ...state.books ];
            const indexToDelete = currentBookToDelete.findIndex(( book ) => {
                return book._id.toString() === action.payload;
            }); 

            currentBookToDelete.splice( indexToDelete, 1 );
            books = currentBookToDelete;
            return { books   }

        case "UPDATE_BOOK": 
            const currentBookToUpdate = [ ...state.books ];
            for( let i=0; i<currentBookToUpdate.length; i++ ){
                if( currentBookToUpdate[i]._id === action.payload._id ){
                    currentBookToUpdate[i].title = action.payload.title;
                    break;
                }
            }

            books = currentBookToUpdate;
            return { books };
    }

    return state;
}
