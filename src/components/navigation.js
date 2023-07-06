import React, { Component } from 'react';
import "../styles/navigation.css";
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import { ReactComponent as Logo } from "../resources/Logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import firebaseApp from "../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage(firebaseApp);
// let firebase = require('../firebase');

const NAV_LINKS = {
    about: "About",
    projects: "Projects",
    synthesis: "Synthesis Demos",
    music: "Music",
    resume: "Resume",
    contact: "Contact"
}

function MobileNav(props) {
    return (
        <div className="mobile-nav-container">
            {!props.mobileNavClicked ? <FontAwesomeIcon className="mobile-nav-menu" color="white" icon={faBars} onClick={props.handleMobileNavChange} /> :
                <>
                    <FontAwesomeIcon className="mobile-nav-menu" color="black" icon={faBars} onClick={props.handleMobileNavChange} />
                    <div className="mobile-nav-menu-title">Menu</div>
                    <hr width="90%"></hr>
                    <div className="mobile-nav-links">
                        {Object.keys(NAV_LINKS).map(key => {
                            if (key === "resume") {
                                return <div className="mobile-nav-link" key={key} onClick={props.downloadResume} activeStyle={{ fontWeight: "bold" }} >Resume</div>

                            } else if (key === "contact") {
                                return <a href="mailto:mattricesound@gmail.com" key={key} target="_blank" rel="noopener noreferrer" className="mobile-nav-link" onClick={props.handleMobileNavChange}> Contact</a>
                            }
                            return <NavLink to={"/" + key} className="mobile-nav-link" activeStyle={{ fontWeight: "bold" }} key={key} onClick={props.handleMobileNavChange}>{NAV_LINKS[key]}</NavLink>
                        })
                        }
                    </div>
                </>
            }
        </div>
    )
}

class Navigation extends Component {

    constructor() {
        super();
        this.state = {
            mobileNavClicked: false
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.setState({ mobileNavClicked: false }))
        window.addEventListener("orientationchange", this.calculateKeyPositions);

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setState({ mobileNavClicked: false }))
        window.removeEventListener("orientationchange", this.calculateKeyPositions);

    }

    // resize = () => {
    // }

    handleMobileNavChange = () => this.setState({ mobileNavClicked: !this.state.mobileNavClicked });


    downloadResume = () => {
        const pathReference = ref(storage, "gs://rice-website.appspot.com/Rice_Resume.pdf");
        getDownloadURL(pathReference).then((url) => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
            };
            xhr.open('GET', url);
            xhr.send();
            window.open(url, '_blank');

        }).catch((e) => {
            console.log(e)
        });
        this.setState({ mobileNavClicked: false })
    }
    render() {
        let backgroundColor;
        let homeLinkName = "Matthew Rice";
        if (this.props.location.pathname === "/") {
            backgroundColor = "transparent";
            homeLinkName = <Logo className="navigation-logo" width={60} height={60} />
        } else {
            backgroundColor = "#293038";
        }
        return (
            <div className="navigation-container" style={{ backgroundColor: backgroundColor }}>
                <NavLink to="/" className="navigation-left-header navigation-link" activeStyle={{ fontWeight: "bold" }}>{homeLinkName}</NavLink>
                {window.screen.width < 1000 ? <MobileNav mobileNavClicked={this.state.mobileNavClicked} handleMobileNavChange={this.handleMobileNavChange} /> :
                    <>
                        <div className="navigation-left-links">
                            {Object.keys(NAV_LINKS).map(key => {
                                if (key !== "contact" && key !== "resume") {
                                    return <NavLink to={"/" + key} className="navigation-main-link navigation-link" activeStyle={{ fontWeight: "bold" }} key={key}>{NAV_LINKS[key]}</NavLink>
                                }
                                return null;
                            })
                            }
                            <div className="navigation-main-link navigation-link" onClick={this.downloadResume} activeStyle={{ fontWeight: "bold" }}>Resume</div>

                        </div>
                        <div className="navigation-right-links">
                            <a href="mailto:mattricesound@gmail.com" target="_blank" rel="noopener noreferrer" className="navigation-link contact-link"> Contact</a>
                        </div>
                    </>
                }
            </div>
        )
    }
}

export default withRouter(Navigation);