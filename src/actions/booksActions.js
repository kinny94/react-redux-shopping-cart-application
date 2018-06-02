// Get Books
import axios from 'axios';

export function getBook(){
    return {
        type: "GET_BOOK"
    }
}

//Post a book
export function postBook( book ){

    return function( dispatch ){
        axios.post( "/books", book ).then(( response ) => {
            dispatch({
                type: "POST_BOOK",
                payload: response.data
            })
        }).catch(( err ) => {
            dispatch({
                type: "POST_BOOK_REJECTED",
                payload: "there was an error while posting a new book"
            })
        })
    }
}

// Delete a book
export function deleteBook( bookId ){
    return {
        type: "DELETE_BOOK",
        payload: bookId
    };
}

// update a book
export function updateBook( book ){
    return { 
        type: "UPDATE_BOOK",
        payload: book
    }
}