import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';

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

    constructor(){
        super();
        this.state = {
            showModal: false
        }
    }

    open(){
        this.setState({
            showModal: true
        })
    }

    close(){
        this.setState({
            showModal: false
        })
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
                    <div className="row">
                        <div className="col-12 checkout-button">
                            <h6>Total Amount: </h6>
                            <button data-toggle="modal" data-target="#exampleModal" className="btn btn-sm btn-success">Checkout</button>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Thank you!!</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6>You order has been saved!</h6>
                                <p>You will receive an email confirmation.</p>
                            </div>
                            <div className="modal-footer">
                                <div className="col-6">
                                    <h6>Total : $</h6>
                                </div>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
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