import React, { Component } from 'react';
import "../styles/about.css";
import Mixer from "../resources/mixer.svg";
import DSP from "../resources/dsp.svg";
import Code from "../resources/code.svg";
import AboutPhoto from "../resources/prof_pic.jpg";
import QMULLogo from "../resources/qmul_logo.jpg";
import UCSDLogo from "../resources/ucsd_logo.png";
import Github from "../resources/GitHub-Mark-Light-32px.png";
import Linkedin from "../resources/linkedin.png";
import Twitter from "../resources/twitter.svg";


class About extends Component {
    render(){
        return (
            <div className="about-content">
                <div className="about-content-container">
                    <div className="about-photo-container">
                        <div className="about-photo-photo-container">
                        <img className="about-photo" src={AboutPhoto} alt="headshot"></img>
                        <div className='about-secret' onDoubleClick={()=>this.props.showHearts(true)}></div>
                        </div>
                        <div className='about-socials-container'>
                            <a href="https://github.com/mhrice" target="_blank" rel="noopener noreferrer"><img src={Github} alt="github" className="social-icon"/></a> 
                            <a href="https://www.linkedin.com/in/matthewrice11/" target="_blank" rel="noopener noreferrer"><img src={Linkedin} alt="github" className="social-icon" style={{width: 35}} /></a> 
                            <a href="https://twitter.com/mattricesound" target="_blank" rel="noopener noreferrer"><img src={Twitter} alt="github" className="social-icon" /></a> 
                        </div>
                    </div>
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
                        <div>My work focuses on merging the <b>creative</b> with the <b>technical</b>, looking to explore new avenues of musical creation and analysis to provide better tools to musicians, producers, composers and audio tech enthusiasts. I'm specifically interested in <b>modern synthesis techniques</b>, <b>audio signal processing</b>, and <b>machine learning music applications.</b></div>
                        <br/>
                        <div className="about-list-title">Education</div>
                        <div className="about-list">
                            <div className="about-list">
                                <div className="about-list-row">
                                    <img src={QMULLogo} className="education-list-icon" alt="QMUL"/>
                                    <div className="list-text">
                                        <b>Queen Mary University of London</b>
                                        <div>M.S. in Sound and Music Computing, AI Music concentration</div>
                                        <i>Fall 2023</i>
                                    </div>
                                </div>
                                <div className="about-list-row">
                                    <img src={UCSDLogo} className="education-list-icon" alt="QMUL"/>
                                    <div className="list-text">
                                        <b>UC San Diego</b>
                                        <div>B.S. Electrical Engineering, DSP concentration</div>
                                        <div>Minor in Music Technology</div>
                                        <i>Fall 2019</i>
                                    </div>
                                </div>                                
                            </div>     
                        </div>               
                    </div>
                </div>
            </div>
        )
    }
}

export default About;