import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends Component{

    handleCart = () => {

        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            price: this.props.price,
            quantity: 1
        }]

        //Check if cart is empty 
        if( this.props.cart.length > 0 ){
            // Cart is not empty
            let _id = this.props._id;
            let cartIndex = this.props.cart.findIndex(( cart ) => {
                return cart._id === _id;
            })

            //If return -1, there are not match
            if( cartIndex === -1 ){
                this.props.addToCart( book );
            }else{
                // only update the quantity
                this.props.updateCart( _id, 1, this.props.cart );
            }
        }else{
            // Cart is empty
            this.props.addToCart( book );
        }
    }

    render(){
        return (

            <div>
                <div className="card">
                    <img className="card-img-top" src="http://www.kxl.com/wp-content/uploads/2016/08/stack_of_books.jpg"/>
                    <div className="card-block">
                        <figure className="profile">
                            <img src="http://www.kxl.com/wp-content/uploads/2016/08/stack_of_books.jpg" class="profile-avatar" alt=""/>
                        </figure>
                        <h4 className="card-title mt-3">{ this.props.title }</h4>
                        <div className="meta">
                            <a>${ this.props.price }</a>
                        </div>
                        <div className="card-text">
                            { this.props.description }
                        </div>
                    </div>
                    <div className="card-footer">
                        {/*<small>Last updated 3 mins ago</small>*/}
                        <button  onClick={ this.handleCart } className="btn btn-success float-right btn-sm">Buy Now</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators( { addToCart: addToCart, updateCart: updateCart }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( BookItem );