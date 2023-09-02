import React, { Component } from 'react';
import "../styles/about.css";
import AboutPhoto from "../resources/prof_pic.jpg";
import QMULLogo from "../resources/qmul_logo.jpg";
import UCSDLogo from "../resources/ucsd_logo.png";
import Github from "../resources/GitHub-Mark-Light-32px.png";
import Linkedin from "../resources/linkedin.png";
import Twitter from "../resources/twitter.svg";
import Mayk from "../resources/mayk.jpeg";
import Qualcomm from "../resources/qualcomm.svg";
import LTW from "../resources/ltw.png";


class About extends Component {
    render() {
        return (
            <div className="about-content">
                <div className="about-content-container">
                    <div className="about-photo-container">
                        <div className="about-photo-photo-container">
                            <img className="about-photo" src={AboutPhoto} alt="headshot"></img>
                            <div className='about-secret' onDoubleClick={() => this.props.showHearts(true)}></div>
                        </div>
                        <div className='about-socials-container'>
                            <a href="https://github.com/mhrice" target="_blank" rel="noopener noreferrer"><img src={Github} alt="github" className="social-icon" /></a>
                            <a href="https://www.linkedin.com/in/matthewrice11/" target="_blank" rel="noopener noreferrer"><img src={Linkedin} alt="github" className="social-icon" style={{ width: 35 }} /></a>
                            <a href="https://twitter.com/mattricesound" target="_blank" rel="noopener noreferrer"><img src={Twitter} alt="github" className="social-icon" /></a>
                        </div>
                    </div>
                    <div className="about-paragraph-container">
                        <p className='about-blurb-container'>
                            I am a master's student at Queen Mary University of London. My work focuses on merging the <b>creative</b> with the <b>technical</b>,
                            looking to explore new avenues of musical creation and analysis
                            to provide better tools to musicians, producers, composers,
                            and audio tech enthusiasts. <br></br>My master's thesis (in progress) topic is general purpose audio effect removal.
                        </p>
                        <div className="about-list-title">Experience</div>
                        <div className="about-list">
                            <div className="about-list-row">
                                <img src={Mayk} className="education-list-icon" alt="Mayk" style={{ "marginTop": "0.2em" }} />
                                <div className="list-text">
                                    <b className='list-text-title'>Mayk</b>
                                    <div>Audio R&D Engineer</div>
                                    <div>Audio Software Engineer</div>
                                    <i>2022 - Present</i>
                                </div>
                            </div>
                            <div className="about-list-row">
                                <img src={Qualcomm} className="education-list-icon" alt="Qualcomm" />
                                <div className="list-text">
                                    <b className='list-text-title'>Qualcomm</b>
                                    <div>Audio Software Engineer</div>
                                    <div>Digital Power Hardware Engineer</div>
                                    <i>2019 - 2022</i>
                                </div>
                            </div>
                            <div className="about-list-row">
                                <img src={LTW} className="education-list-icon" alt="Listening to Waves" style={{ "maxHeight": "2.5em", "marginTop": "0.5em" }} />
                                <div className="list-text">
                                    <b className='list-text-title'>Listening to Waves</b>
                                    <div>Web Audio Developer</div>
                                    <i>2017 - 2019</i>
                                </div>
                            </div>
                        </div>
                        <div className="about-list-title">Education</div>
                        <div className="about-list">
                            <div className="about-list-row">
                                <img src={QMULLogo} className="education-list-icon" alt="QMUL" />
                                <div className="list-text">
                                    <b className='list-text-title'>Queen Mary University of London</b>
                                    <div>M.S. Sound and Music Computing</div>
                                    <i>Fall 2023</i>
                                </div>
                            </div>
                            <div className="about-list-row">
                                <img src={UCSDLogo} className="education-list-icon" alt="QMUL" />
                                <div className="list-text">
                                    <b className='list-text-title'>UC San Diego</b>
                                    <div>B.S. Electrical Engineering</div>
                                    <div>Minor in Music Technology</div>
                                    <i>Fall 2019</i>
                                </div>
                            </div>
                        </div>
                        <div className="about-list-title">Publications</div>
                        <div className="about-list">
                            <div className="about-list-row">
                                <div className="list-text">
                                    <b className='list-text-title'>General Purpose Audio Effect Removal</b>
                                    <div>Matthew Rice*, Christian Steinmetz*, Joshua Reiss, George Fazekas</div>
                                    <div>IEEE Workshop on Applications of Signal Processing to Audio and Acoustics (WASPAA). October 2023</div>
                                    <div>
                                        <a href="https://arxiv.org/abs/2308.16177">Paper</a>
                                        <a href="https://www.youtube.com/watch?v=0gbiO3LkyuM">Video</a>
                                        <a href="https://huggingface.co/spaces/mattricesound/RemFx">Demo</a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-list-row">
                                <div className="list-text">
                                    <b className='list-text-title'>The Lena Singer Project: Simulating the Learning Experience of a Singer</b>
                                    <div>Matthew Rice and Simon Colton</div>
                                    <div>Proceedings of the 14th International Conference
                                        on Computational Creativity (ICCC). May 2023</div>
                                    <a href="https://computationalcreativity.net/iccc23/papers/ICCC-2023_paper_108.pdf">Paper</a>
                                </div>
                            </div>
                        </div>
                        <div className="about-list-title">Talks</div>
                        <div className="about-list">
                            <div className="about-list-row">
                                <div className="list-text">
                                    <b className='list-text-title'>Creating Your Own Singing Voice Synthesizer</b>
                                    <div>Harmonai Hangouts. June 2023</div>
                                    <div>
                                        <a href="https://drive.google.com/file/d/1eE4IrzzLR76vtNoahGfCnXTN2Lr63YWU/view?usp=sharing">Slides</a>
                                    </div>
                                </div>
                            </div>
                            <div className="about-list-row">
                                <div className="list-text">
                                    <b className='list-text-title'>Creating Your Own Singing Voice Synthesizer</b>
                                    <div>ADCx San Francisco. May 2023</div>
                                    <div>
                                        <a href="https://www.youtube.com/watch?v=fqWL2Qj5eSQ&t=11787s">Video </a>
                                        <a href="https://t.co/yzMckBq0BI">Slides</a>
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