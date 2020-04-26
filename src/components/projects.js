import React, { Component } from 'react';
import "../styles/projects.css";
import Black from "../resources/black.jpg";
import Github from "../resources/GitHub-Mark-32px.png";
import ProjectData from "../projectData"
function Project(props){
   return (
       <div className="project-container">
           <a href={props.link} target="_blank"><img src={props.picture} alt={props.title} className="project-img"></img></a>
           <div className="project-text">
             <div className="project-title">{props.title}</div>
             <div className="project-description">{props.description}</div>
             <div className="project-date-and-github">
                <div className="project-date">{props.date}</div>
                <a className="project-github" href={props.githubLink} target="_blank"><img src={Github} alt="github"/></a> 
            </div>
            </div>
       </div>
   ) 
}

class Projects extends Component {
    render(){
        return (
            <div className="projects-content">
                <div className="projects-title">Projects</div>
                <div className="projects-container">
                    {ProjectData.map(item=>{
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
                    <Project title="Test" picture ={Black} description="This is a description" date={1991}/>

                </div>
            </div>
        )
    }
}

export default Projects;