import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBook } from '../../actions/booksActions';

class BookForm extends Component{

    handleSubmit = ( event ) => {

        event.preventDefault();

        console.log(  );
        const book = [{
            title: event.target.elements.title.value,
            description: event.target.elements.description.value,
            price: event.target.elements.price.value
        }];
        this.props.postBook( book );     
    }

    render(){
        
        return (
            <div>
                <div>
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
                </div>
            </div>
        )
    }
}

function mapDispatchToProps( dispatch ){
    return bindActionCreators( {postBook }, dispatch )
}

export default connect( null, mapDispatchToProps )( BookForm );