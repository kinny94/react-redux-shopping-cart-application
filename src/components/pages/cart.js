import React, { Component } from 'react';
import { connect } from 'react-native';

class Cart extends Component{

    renderEmpty = () => {
        return(
            <div>

            </div>
        )
    }

    renderCart = () => {

        const cartItemsList = this.props.cart.map(( cartElement ) => {
            return(
                <div key={ cartElement.id }>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <h6>{ cartElement.title }</h6>
                        </div>
                    </div>
                </div>
            )
        })
        return(
            <div className="card">
                { cartItemsList }
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

export default (connect)( mapStateToProps )( Cart );