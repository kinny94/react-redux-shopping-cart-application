import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BookList from '../components/pages/booksList';
import Cart from '../components/pages/cart';
import BookForm from '../components/pages/bookForm';

import Menu from '../components/menu';
import Footer from '../components/footer'; 

import { connect } from 'react-redux';
class Main extends Component {

    render(){
        return (
            <div>
                <Menu cartItemsNumber={ this.props.totalQty } />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={ BookList } />
                        <Route exact path="/admin" component={ BookForm } />
                        <Route exact path="/cart" component={ Cart } />
                    </Switch>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        totalQty: state.cart.totalQty
    }
}

export default connect( mapStateToProps )( Main );