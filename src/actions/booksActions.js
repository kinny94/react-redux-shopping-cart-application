// Get Books
export function getBook(){
    return {
        type: "GET_BOOK"
    }
}

//Post a book
export function postBook( book ){
    return {
        type: "POST_BOOK",
        payload: book
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