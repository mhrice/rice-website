import React, { Component } from 'react';
import "../styles/projects.css";
import Black from "../resources/black.jpg";
import Github from "../resources/GitHub-Mark-Light-32px.png";
import { ProjectData, FeaturedProjects } from "../projectData"
function Project(props) {
    return (
        <div className="project-container">
            <a href={props.link} target="_blank" rel="noopener noreferrer"><img src={props.picture} alt={props.title} className="project-img"></img></a>
            <div className="project-text">
                <div className="project-title">{props.title}</div>
                <div className="project-description">{props.description}
                    {(props.title === "Interactive Spectrogram" || props.title === "Interactive Signal Generator") &&
                        <a className="ltw-link" href="https://listeningtowaves.com/" target="_blank" rel="noopener noreferrer">Listening To Waves</a>
                    }
                </div>
                <div className="project-date-and-github">
                    <div className="project-date">{props.date}</div>
                    <a className="project-github" href={props.githubLink} target="_blank" rel="noopener noreferrer"><img src={Github} alt="github" /></a>
                </div>
            </div>
        </div>
    )
}

class Projects extends Component {
    render() {
        return (
            <div className="projects-content">
                <div className="projects-title">Featured Projects</div>
                <hr width="90%" />
                <div className="projects-container">
                    {FeaturedProjects.map(item => {
                        return (
                            <Project
                                key={item.title}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                picture={item.picture}
                                link={item.link}
                                githubLink={item.githubLink}
                            />
                        )
                    })}
                </div>
                <hr width="90%" />
                <div className="projects-title">Other Projects</div>
                <div className="projects-container other">
                    {ProjectData.map(item => {
                        return (
                            <Project
                                key={item.title}
                                title={item.title}
                                description={item.description}
                                date={item.date}
                                picture={item.picture}
                                link={item.link}
                                githubLink={item.githubLink}
                            />
                        )
                    })}

                </div>
            </div>
        )
    }
}

export default Projects;