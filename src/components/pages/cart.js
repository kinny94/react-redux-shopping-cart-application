import React, { Component } from 'react';
import { connect } from 'react-redux';

class Cart extends Component{

    renderEmpty = () => {
        return(
            <div></div>
        )
    }

    renderCart = () => {

        const cartItemsList = this.props.cart.map(( cartElement ) => {
            return(
                <div key={ cartElement.id }>
                    <div className="row">
                        <div className="card w-100 p-3">
                        <div className="card-header">
                            <h3 className="mb-0">{ cartElement.title }</h3>
                        </div>
                            <div className="card-body">
                                { cartElement.description }
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return(
            <div className="card card-outline-secondary">
                <div className="card-header">
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

export default connect( mapStateToProps )( Cart );