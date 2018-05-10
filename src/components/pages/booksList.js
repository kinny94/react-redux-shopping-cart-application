import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookList extends Component{

    render(){

        console.log( "Hello " + this.props.books );
        const bookList = this.props.books.map(( book ) => {
            return (
                <div key={ book.id }>
                    <h2>{ book.title }</h2>
                    <h2>{ book.description }</h2>
                    <h3>{ book.price }</h3>
                </div>
            )
        });

        return(
            <div>
                { bookList }
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        books: state.books.books
    }
}

export default connect( mapStateToProps )(BookList);