// Get Books
import axios from 'axios';

export function getBook(){
    return function( dispatch ){
        axios.get( "/api/books" ).then(( response ) => {
            dispatch({
                type: "GET_BOOKS",
                payload: response.data
            });
        }).catch(( err ) => {
            dispatch({
                type: "GET_BOOKS_REJECTED",
                payload: err
            });
        });
    }
}

//Post a book
export function postBook( book ){

    return function( dispatch ){
        axios.post( "/api/books", book ).then(( response ) => {
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
    return function( dispatch ){
        axios.delete( "/api/books/" + bookId ).then(( response ) => {
            dispatch({
                type: "DELETE_BOOK",
                payload: bookId
            });
        }).catch(( err ) => {
            dispatch({
                type: "DELETE_BOOK_REJECTED", payload: err
            });
        });
    }
}

// update a book
export function updateBook( book ){
    return function( disptach ){
        axios.delete( "/api/books/" + id ).then(( response ) => {
            dispatch({
                type: "DELETE_BOOK",
                payload: id
            });ç
        }).catch(( err ) => {
            dispatch({
                type: "DELETE_BOOK_REJECTED", payload: err
            });
        });
    }
}

//Reset button
export function resetButton(){
    return{
        type: "RESET_BUTTON"
    }
}