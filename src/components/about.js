import React, { Component } from 'react';
import "../styles/about.css";
import Mixer from "../resources/mixer.svg";
import DSP from "../resources/dsp.svg";
import Code from "../resources/code.svg";

class About extends Component {
    render(){
        return (
            <div className="about-content">
                <div className="about-name">Matthew Rice</div>
                <div className="about-paragrah-container">
                    <div>As an <b>audio experience engineer</b> I'm someone who understands how to realize unique 
                        tech-based audio ideas. I'm a:  
                        <div className="about-list">
                            <div className="about-list-row">
                                <img src={DSP} className="list-icon"/>
                                <div className="list-text">DSP enthusiast with extensive course work in signal processing
                                </div>
                            </div>
                            <div className="about-list-row">
                                <img src={Code} className="list-icon"/>
                                <div className="list-text">Proficient programmer with many academic
                                and industry software projects 
                                </div>
                            </div>
                            <div className="about-list-row">
                                <img src={Mixer} className="list-icon"/>
                                <div className="list-text">Experienced front-of-house engineer
                                having mixed over 200 concerts, working with artists such as Sean Kingston, Rico Nasty, and FLETCHER
                                </div>
                            </div>
                        </div>                    
                    </div>
                    <div>I'm interested in <b>modern synthesis techniques</b>, <b>audio signal processing</b>, and <b>machine learning music applications.</b></div>
                    <div>Currently, I'm a hardware engineer at Qualcomm, looking to eventually pursue a master's in music technology</div>
                </div>
            </div>
        )
    }
}

export default About;