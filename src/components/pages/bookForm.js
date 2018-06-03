import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBook, deleteBook } from '../../actions/booksActions';
import axios from 'axios';

class BookForm extends Component{

    constructor(){
        super();

        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount(){
        axios.get( '/api/images' ).then(( response ) => {
            this.setState({
                images: response.data
            })
        }).catch(( err ) => {
            this.setState({
                images: 'error loading image files from the server', img: ''
            });
        });
    }

    handleSubmit = ( event ) => {

        event.preventDefault();

        const book = [{
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            price: event.target.elements.price.value
        }];
        this.props.postBook( book );     
    }

    onDelete = ( event ) => {

        event.preventDefault();

        let bookId = findDOMNode( this.refs.delete ).value;
        this.props.deleteBook( bookId );
    }

    render(){

        const bookList = this.props.books.map(( booksArr ) => {
            return(
                <option key={ booksArr._id }>{ booksArr._id }</option>
            )
        });
        
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card-body">
                        <form className="form" role="form" autocomplete="off">
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Select an image to upload..</label>
                                <select name="delete" id="delete" ref="delete" class="form-control" id="exampleFormControlSelect1">
                                    <option value="select">select</option>
                                    { imgList }
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12">
                    <span className="anchor" id="formContact"></span>
                    <hr className="my-5"/>
                    <div className="card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">Contact</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ this.handleSubmit } className="form" role="form" autocomplete="off">
                                <fieldset>
                                    <div className="label">
                                        <label for="title" className="mb-0">Book Title</label>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <input type="text" ref="title" name="title" id="title" placeholder="Bookname.." className="form-control" required=""/>
                                        </div>
                                    </div>
                                    <div className="label">
                                        <label for="description" className="mb-0">Description</label>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <input type="text" ref="description" name="description" id="description" placeholder="Greatest book.." className="form-control" required=""/>
                                        </div>
                                    </div>
                                    <div className="label">
                                        <label for="price" className="mb-0">Book Price</label>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <input type="number" ref="price" name="price" id="price" placeholder="$50" className="form-control" required=""/>
                                        </div>
                                    </div>
                                    <div className="label">
                                        <button type="submit" className="btn btn-secondary btn-lg float-none">Save Book</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    <div className="bookform card card-outline-secondary">
                        <div className="card-header">
                            <h3 className="mb-0">More options</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ this.onDelete } className="form" role="form" autocomplete="off">
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Select a book to delete..</label>
                                    <select name="delete" id="delete" ref="delete" class="form-control" id="exampleFormControlSelect1">
                                        <option value="select">select</option>
                                        { bookList }
                                    </select>
                                </div>
                            </form>
                            <button onClick={ this.onDelete } className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps( state ){
    return{
        books: state.books.books
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators( { postBook, deleteBook }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( BookForm );