import React, { Component } from 'react';
import "../styles/navigation.css";
import { Link, NavLink } from "react-router-dom";

class Navigation extends Component {
    render(){
        return (
        <div className="navigation-container">
            <NavLink to="/" className="navigation-left-header navigation-link">Home</NavLink>
            <div className="navigation-left-links">
                <NavLink to="/about" className="navigation-main-link navigation-link">About</NavLink>
                <NavLink to="/projects" className="navigation-main-link navigation-link">Projects</NavLink>
                <NavLink to="/synthesis" className="navigation-main-link navigation-link">Synthesis Demos</NavLink>
            </div>
            <div className="navigation-right-links">
                <NavLink to="/contact" className="navigation-link">Contact</NavLink>
            </div>
        </div>
        )
    }
}

export default Navigation;