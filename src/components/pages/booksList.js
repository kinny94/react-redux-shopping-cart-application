import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import { getBook } from '../../actions/booksActions';
import Cart from './cart';

import BookItem from './bookItem';
import BookForm from './bookForm';
class BookList extends Component{

    componentDidMount(){
        this.props.getBook();
    }

    renderBooks = () => {
        if( this.props.books.length === 0 ){
            return <p>Getting books...</p>
        }else{
            return this.props.books.map(( book ) => {
                return (
                    <Col xs={ 12 } sm={ 6 } md={ 4 } key={ book._id }>
                        <BookItem _id={ book._id } title={ book.title } description={ book.description } price={ book.price }/>
                    </Col>
                )
            })
        }
    }

    render(){
        return(
            <Grid>
                <div className="Row">
                    <Cart />
                </div>
                <Row style={{ marginTop: '15px'}}>
                    { this.renderBooks() }
                </Row>
            </Grid>
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