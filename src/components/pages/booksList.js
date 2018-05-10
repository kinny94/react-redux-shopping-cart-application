import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBook } from '../../actions/booksActions';
class BookList extends Component{

    componentDidMount(){
        this.props.getBook();
    }

    renderBooks = () => {
        if( this.props.books.length === 0 ){
            console.log( this.props.books );
            return <p>Getting books...</p>
        }else{
            return this.props.books.map(( book ) => {
                return (
                    <div key={ book.id }>
                        <h2>{ book.id }</h2>
                        <h2>{ book.title }</h2>
                        <h3>{ book.description }</h3>
                    </div>
                )
            })
        }
    }

    render(){
        return(
            <div>
                { this.renderBooks() }
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        books: state.books.books
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators({ getBook: getBook }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )(BookList);