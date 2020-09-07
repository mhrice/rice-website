import React, { Component } from 'react';
import "../styles/about.css";
import Mixer from "../resources/mixer.svg";
import DSP from "../resources/dsp.svg";
import Code from "../resources/code.svg";
import AboutPhoto from "../resources/prof_pic.jpg";

class About extends Component {
    render(){
        return (
            <div className="about-content">
                <div className="about-content-container">
                    <div className="about-photo-container"><img className="about-photo" src={AboutPhoto} alt="headshot"></img></div>
                    <div className="about-paragraph-container">
                        <div>As an <b>audio experience engineer</b> I'm someone who understands how to realize unique 
                            tech-based audio ideas. I'm a: 
                            <br/>
                            <div className="about-list">
                                <div className="about-list-row">
                                    <img src={DSP} className="list-icon" alt="DSP"/>
                                    <div className="list-text">DSP enthusiast with extensive course work in signal processing
                                    </div>
                                </div>
                                <div className="about-list-row">
                                    <img src={Code} className="list-icon" alt="Code"/>
                                    <div className="list-text">Proficient programmer with many academic
                                    and industry software projects both audio and non-audio related (including this website!) 
                                    </div>
                                </div>
                                <div className="about-list-row">
                                    <img src={Mixer} className="list-icon" alt="Audio Mixing"/>
                                    <div className="list-text">Experienced front-of-house engineer
                                    having mixed over 200 concerts, working with artists such as Sean Kingston, Rico Nasty, and FLETCHER
                                    </div>
                                </div>
                            </div>                    
                        </div>
                        <div>My work focuses on merging the creative with the technical, looking to explore new avenues of musical creation and analysis to provide better tools to musicians, producers, composers and audio tech enthusiasts. I'm specifically interested in <b>modern synthesis techniques</b>, <b>audio signal processing</b>, and <b>machine learning music applications.</b></div>
                        <br/>
                        <div>Currently, I'm a hardware engineer at Qualcomm, looking to eventually pursue a master's in music technology before beginning my music software career</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;