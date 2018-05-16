import React, { Component } from 'react';
import {Nav, Navbar, NavItem, Badge, NavDropdown } from 'react-bootstrap';

class Menu extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/about">About <span class="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">Admin</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cart">Your cart <span className="badge badge-warning">1</span></a>
                        </li>
                    </ul>
                </div>
          </nav>
        )
    }
}

export default Menu;