
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
            console.log( books );
            return { books };
            break;
        
        case "DELETE_BOOK":
            const currentBookToDelete = [ ...state.books ];
            const indexToDelete = currentBookToDelete.findIndex(( book ) => {
                return book._id.toString() === action.payload;
            }); 

            currentBookToDelete.splice( indexToDelete, 1 );
            books = currentBookToDelete;
            console.log( books );
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
            console.log( books );
            return { books };
    }

    return state;
}
