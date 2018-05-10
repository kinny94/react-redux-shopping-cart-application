
export function booksReducers( state = {  books: [
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
    ] }, action ){
    switch( action.type ){

        case "GET_BOOKS":
        
            return {
                ...state, books: [...state.books]
            }

        case "POST_BOOK":
            let books = state.books.concat( action.payload );
            console.log( books );
            return { books };
            break;
        
        case "DELETE_BOOK":
            const currentBookToDelete = [ ...state.books ];
            const indexToDelete = currentBookToDelete.findIndex(( book ) => {
                return book.id === action.payload.id;
            }); 

            currentBookToDelete.splice( indexToDelete, 1 );
            books = currentBookToDelete;
            console.log( books );
            return { books   }

        case "UPDATE_BOOK": 
            const currentBookToUpdate = [ ...state.books ];
            for( let i=0; i<currentBookToUpdate.length; i++ ){
                if( currentBookToUpdate[i].id === action.payload.id ){
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
