import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BookList from '../components/pages/booksList';
import Cart from '../components/pages/cart';
import BookForm from '../components/pages/bookForm';

class Main extends Component {

    render(){
        return (
            <div className="container">
                <Switch>
                    <Route exact path="/" component={ BookList } />
                    <Route exact path="/admin" component={ BookForm } />
                    <Route exact path="/cart" component={ Cart } />
                </Switch>
            </div>
        )
    }
}

export default Main;