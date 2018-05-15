import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteCartItem } from '../../actions/cartActions';

class Cart extends Component{

    onDelete( _id ){

        console.log( "Clicked!!");
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
                                        <h6>qty <label className="success"></label></h6>
                                    </div>
                                    <div className="col-4">
                                        <div class="btn-group cart-button" role="group" aria-label="Basic example">
                                            <button type="button" class="btn btn-default btn-sm">-</button>
                                            <button type="button" class="btn btn-default btn-sm">+</button>
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
            deleteCartItem: deleteCartItem
        }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( Cart );