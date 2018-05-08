import { createStore } from 'redux';

console.log( "Hello" );
//Step 3 - define the reducers
const reducer = ( state = 0, action ) => {
    switch( action.type ){
        case "INCREMENT":
            return state + action.payload;
            break;
    }

    return state;
}

// Step 1 - create the store
const store = createStore( reducer );
store.subscribe(() => {
    console.log( 'current state is: '  + store.getState());
});

// Step 2 - Create and dispatch the actions
store.dispatch({
    type: "INCREMENT",
    payload: 1
}); 