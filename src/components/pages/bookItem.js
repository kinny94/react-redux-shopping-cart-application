import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../actions/cartActions';

class BookItem extends Component{

    handleCart = () => {

        const book = [...this.props.cart, {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            price: this.props.title 
        }]
        this.props.addToCart( book );
    }

    render(){
        return (

            <div>
                <div className="card">
                    <img className="card-img-top" src="http://success-at-work.com/wp-content/uploads/2015/04/free-stock-photos.gif"/>
                    <div className="card-block">
                        <figure className="profile">
                            <img src="http://success-at-work.com/wp-content/uploads/2015/04/free-stock-photos.gif" class="profile-avatar" alt=""/>
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
    return bindActionCreators( { addToCart: addToCart }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( BookItem );