import React, { Component } from 'react';

class BookForm extends Component{
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
                            <form className="form" role="form" autocomplete="off">
                                <fieldset>
                                    <div className="label">
                                        <label for="title" className="mb-0">Book Title</label>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <input type="text" name="title" id="title" placeholder="Bookname.." className="form-control" required=""/>
                                        </div>
                                    </div>
                                    <div className="label">
                                        <label for="description" className="mb-0">Description</label>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <input type="text" name="description" id="description" placeholder="Greatest book.." className="form-control" required=""/>
                                        </div>
                                    </div>
                                    <div className="label">
                                        <label for="price" className="mb-0">Book Price</label>
                                    </div>
                                    <div className="row mb-1">
                                        <div className="col-lg-12">
                                            <input type="number" name="price" id="price" placeholder="$50" className="form-control" required=""/>
                                        </div>
                                    </div>
                                    <div className="text-center">
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

export default BookForm;