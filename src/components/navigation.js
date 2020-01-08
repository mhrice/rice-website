import React, { Component } from 'react';
import "../styles/navigation.css";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Navigation extends Component {
    render(){
        let backgroundColor;
        if(this.props.location.pathname === "/"){
            backgroundColor = "transparent";
        } else {
            backgroundColor = "#293038";
        }
        return (
        <div className="navigation-container" style={{backgroundColor: backgroundColor}}>
            <NavLink to="/" className="navigation-left-header navigation-link" activeStyle={{fontWeight: "bold"}}>Home</NavLink>
            <div className="navigation-left-links">
                <NavLink to="/about" className="navigation-main-link navigation-link" activeStyle={{fontWeight: "bold"}}>About</NavLink>
                <NavLink to="/projects" className="navigation-main-link navigation-link" activeStyle={{fontWeight: "bold"}}>Projects</NavLink>
                <NavLink to="/synthesis" className="navigation-main-link navigation-link" activeStyle={{fontWeight: "bold"}}>Synthesis Demos</NavLink>
            </div>
            <div className="navigation-right-links">
                <a href="mailto:mattricesound@gmail.com" target="_top" className="navigation-link contact-link"> Contact</a>
            </div>
        </div>
        )
    }
}

export default withRouter(Navigation);