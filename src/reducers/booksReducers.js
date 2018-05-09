
export function booksReducers( state = { books:[] }, action ){
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
            for( let i=0; i<currentBookToUpdate.length; i++ ){
                if( currentBookToUpdate[i].id === action.payload.id ){
                    currentBookToUpdate[i].title = action.payload.title;
                    break;
                }
            }
            return {
                books: [
                    currentBookToUpdate
                ]
            };
            break;
    }

    return state;
}
