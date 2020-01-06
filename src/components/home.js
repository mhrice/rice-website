import React, { Component } from 'react';
import Piano from "./piano";
import "../styles/home.css";


class Home extends Component {
    render(){
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="home-name">Matthew Rice</div>
                    <div className="home-subtitle">Audio Experience Engineer</div>
                </div>
                <Piano/>
            </div>
        )
    }
}

export default Home;