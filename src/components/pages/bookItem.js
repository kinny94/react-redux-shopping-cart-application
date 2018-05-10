import React, { Component } from 'react';

class BookItem extends Component{
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
                        <button className="btn btn-success float-right btn-sm">Buy Now</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookItem;