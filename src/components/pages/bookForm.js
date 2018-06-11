import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBook, deleteBook, getBook, resetButton } from '../../actions/booksActions';
import axios from 'axios';

class BookForm extends Component{

    constructor(){
        super();

        this.state = {
            images: [],
            selectedValue: '',
            errorMsg: '',
            errorStar: ''
        }
    }

    componentDidMount(){

        this.props.getBook();
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

        if( this.state.selectedValue === '' || event.target.elements.title.value === '' ||  event.target.elements.description.value === '' ||  event.target.elements.price.value === '' ){
            this.setState({
                errorMsg: 'All Fields are required',
                errorStar: "*"
            });
        }else{
            const book = [{
                images: this.state.selectedValue,
                title: event.target.elements.title.value,
                description: event.target.elements.description.value,
                price: event.target.elements.price.value
            }];
            this.props.postBook( book );
        }     
    }

    onDelete = ( event ) => {

        event.preventDefault();

        let bookId = findDOMNode( this.refs.delete ).value;
        this.props.deleteBook( bookId );
    }

    handleChange = ( event ) => {

        this.setState({
            selectedValue: "/images/" + event.target.value
        });
    }

    resetForm(){

        // Reset the button 

        this.props.resetButton();

        event.target.elements.title.value = '',
        event.target.elements.description.value = '',
        event.target.elements.price.value = '',
        this.setState({
            selectedValue: ''
        });
    }

    renderUploadImage = () => {
        if( this.state.selectedValue !== '' ){
            return <img ref="images" name="images" className="img-fluid rounded mx-auto d-block" src={ this.state.selectedValue } />
        }
    }
    render(){

        const bookList = this.props.books.map(( booksArr ) => {
            return(
                <option key={ booksArr._id }>{ booksArr._id }</option>
            )
        });

        const imgList = this.state.images.map(( image ) => {
            return(
                <option value={ image.name } key={ image.name }>{ image.name }</option>
            )
        }, this);
        
        return (
            <div className="row">
                <div className="col-6">
                    <div className="col-12">
                        <span className="anchor" id="formContact"></span>
                        <hr className="my-5"/>
                        <div className="card card-outline-secondary">
                            <div className="card-header">
                                <h3 className="mb-0">Image Upload</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ this.onDelete } className="form" role="form" autocomplete="off">
                                    <div class="form-group">
                                    <span className="danger">{ this.state.errorStar }</span><select onChange={ this.handleChange } value={ this.state.selectedValue } class="form-control" id="exampleFormControlSelect1">
                                            <option value="select">Select an Image to Upload..</option>
                                            { imgList }
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="card-body">
                                { this.renderUploadImage() }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="col-12">
                        <span className="anchor" id="formContact"></span>
                        <hr className="my-5"/>
                        <div className="card card-outline-secondary">
                            <div className="card-header">
                                <h3 className="mb-0">Contact</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ ( !this.props.msg ) ? ( this.handleSubmit ) : ( this.resetForm )  } className="form" role="form" autocomplete="off">
                                    <fieldset>
                                        <div className="label">
                                            <label for="title" className="mb-0">Book Title <span className="danger">{ this.state.errorStar }</span></label>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-lg-12">
                                                <input required type="text" ref="title" name="title" id="title" placeholder="Bookname.." className="form-control" required=""/>
                                            </div>
                                        </div>
                                        <div className="label">
                                            <label for="description" className="mb-0">Description <span className="danger">{ this.state.errorStar }</span></label>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-lg-12">
                                                <input required type="text" ref="description" name="description" id="description" placeholder="Greatest book.." className="form-control" required=""/>
                                            </div>
                                        </div>
                                        <div className="label">
                                            <label for="price" className="mb-0">Book Price <span className="danger">{ this.state.errorStar }</span></label>
                                        </div>
                                        <div className="row mb-1">
                                            <div className="col-lg-12">
                                                <input required type="number" ref="price" name="price" id="price" placeholder="$50" className="form-control" required=""/>
                                            </div>
                                        </div>
                                        <div className="label">
                                            <button type="submit" className={ ( !this.props.style ) ? ("btn-secondary btn btn-lg float-none") : ( this.props.style ) } >
                                                { ( !this.props.msg ) ? ( "Save book" ) : ( this.props.msg )}
                                            </button>
                                        </div>
                                        <p className="danger">{ this.state.errorMsg }</p>
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
            </div>
        )
    }
}

function mapStateToProps( state ){
    return{
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style,
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators( { postBook, deleteBook, getBook, resetButton }, dispatch )
}

export default connect( mapStateToProps, mapDispatchToProps )( BookForm );