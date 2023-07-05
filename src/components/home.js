import React, { Component } from 'react';
import Piano from "./piano";
import "../styles/home.css";
import * as Tone from "tone";


class Home extends Component {
    componentDidMount() {
        this.props.homeMounted(1);
        document.addEventListener("pointerdown", async () => {
            await Tone.start();
        });

    }


    componentWillUnmount() {
        this.props.homeMounted(0);
    }
    render() {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="home-name">Matthew Rice</div>
                    <div className="home-subtitle">Audio ML/DSP Engineer</div>
                </div>
                <Piano />
            </div>
        )
    }
}

export default Home;