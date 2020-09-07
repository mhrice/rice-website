import React, { Component } from 'react';
import "../styles/navigation.css";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

var firebase = require('../firebase');
var storage = firebase.storage();

class Navigation extends Component {
    downloadResume = () =>{
    var pathReference = storage.refFromURL("gs://rice-website.appspot.com/Rice_Resume_04-26-20.pdf");
    pathReference.getDownloadURL().then((url)=>{
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
        var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        window.open(url, '_blank');

    }).catch((e)=>{
        console.log(e)
    });
    }    
    render(){
        let backgroundColor;
        let homeLinkName = "Matthew Rice";
        if(this.props.location.pathname === "/"){
            backgroundColor = "transparent";
            homeLinkName = "Logo";
        } else {
            backgroundColor = "#293038";
        }
        return (
        <div className="navigation-container" style={{backgroundColor: backgroundColor}}>
            <NavLink to="/" className="navigation-left-header navigation-link" activeStyle={{fontWeight: "bold"}}>{homeLinkName}</NavLink>
            <div className="navigation-left-links">
                <NavLink to="/about" className="navigation-main-link navigation-link" activeStyle={{fontWeight: "bold"}}>About</NavLink>
                <NavLink to="/work" className="navigation-main-link navigation-link" activeStyle={{fontWeight: "bold"}}>Work</NavLink>
                <NavLink to="/synthesis" className="navigation-main-link navigation-link" activeStyle={{fontWeight: "bold"}}>Synthesis Demos</NavLink>
                <NavLink to="/music" className="navigation-main-link navigation-link" activeStyle={{fontWeight: "bold"}}>Music</NavLink>

                <div className="navigation-main-link navigation-link" onClick={this.downloadResume} activeStyle={{fontWeight: "bold"}}>Resume</div>

            </div>
            <div className="navigation-right-links">
                <a href="mailto:mattricesound@gmail.com" target="_blank" className="navigation-link contact-link"> Contact</a>
            </div>
        </div>
        )
    }
}

export default withRouter(Navigation);