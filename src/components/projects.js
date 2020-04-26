import React, { Component } from 'react';
import "../styles/projects.css";
import Black from "../resources/black.jpg";
import ProjectData from "../projectData"

function Project(props){
   return (
       <div className="project-container">
           <img src={props.picture} alt={props.title} className="project-img"></img>
           <div className="project-text">
             <div className="project-title">{props.title}</div>
             <div className="project-description">{props.description}</div>
             <div className="project-date">{props.date}</div>
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