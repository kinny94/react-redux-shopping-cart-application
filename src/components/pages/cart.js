import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteCartItem, updateCart } from '../../actions/cartActions';

class Cart extends Component{

    onDelete( _id ){

        const currentBookToDelete = this.props.cart;

        const indexToDelete = currentBookToDelete.findIndex(( cart ) => {
            return cart._id === _id;
        }); 

        let cartAfterDelete = [ 
                ...currentBookToDelete.slice( 0, indexToDelete ), 
                ...currentBookToDelete.slice( indexToDelete + 1 )
            ]
        this.props.deleteCartItem( cartAfterDelete );
    }

    onIncrement( _id ){
        this.props.updateCart( _id, 1 );
    }

    onDecrement( _id, quantity ){
        if( quantity > 1 ){
            this.props.updateCart( _id, -1 );
        }
    }

    renderEmpty = () => {
        return(
            <div></div>
        )
    }

    renderCart = () => {

        const cartItemsList = this.props.cart.map(( cartElement ) => {
            return(
                <div key={ cartElement._id }>
                    <div className="row">
                        <div className="card w-100 p-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <h6>{ cartElement.title }</h6>
                                    </div>
                                    <div className="col-2">
                                        <h6>${ cartElement.price }</h6>
                                    </div>
                                    <div className="col-2">
                                        <h6>qty <span class="badge badge-success">{ cartElement.quantity }</span></h6>
                                    </div>
                                    <div className="col-4">
                                        <div class="btn-group cart-button" role="group" aria-label="Basic example">
                                            <button onClick={ this.onDecrement.bind( this, cartElement._id, cartElement.quantity )} type="button" class="btn btn-default btn-sm">-</button>
                                            <button onClick={ this.onIncrement.bind( this, cartElement._id ) } type="button" class="btn btn-default btn-sm">+</button>
                                            <span>      </span>
                                            <button onClick={ this.onDelete.bind( this, cartElement._id )} type="button" className="btn btn-danger btn-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }, this)
        return(
            <div className="card card-outline-secondary">
                <div className="card-header success">
                    <h3 className="mb-0">Cart</h3>
                </div>
                <div className="card-body">
                    { cartItemsList }
                </div>
            </div>
        )
    }

    render(){

        if( this.props.cart[0] ){
            return this.renderCart();   
        }else{
            return this.renderEmpty();   
        }
    }

}

function mapStateToProps( state ){
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({
            deleteCartItem: deleteCartItem,
            updateCart: updateCart
        }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( Cart );