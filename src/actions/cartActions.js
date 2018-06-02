//ADD To cart
export function addToCart( book ){
    return{
        type: "ADD_TO_CART",
        payload: book
    }
}

//Delete from cart

export function deleteCartItem( cart ){
    return{
        type: "DELETE_CART_ITEM",
        payload: cart
    }
}

//update cart
export function updateCart( _id, unit, cart ){

    const currentBookToUpdate = cart;
        const indexToUpdate = currentBookToUpdate.findIndex(( book ) => {
            return  book._id === _id;
        });

        const newBookToUpdate = {
            ...currentBookToUpdate[ indexToUpdate ],
            quantity: currentBookToUpdate[ indexToUpdate ].quantity + unit
        }

        let cartUpdate = [
            ...currentBookToUpdate.slice( 0, indexToUpdate ),
            newBookToUpdate,
            ...currentBookToUpdate.slice( indexToUpdate + 1 )
        ]

    return{
        type: "UPDATE_CART",
        payload: cartUpdate
    }
}