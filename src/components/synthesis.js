import React, { Component } from 'react';
import "../styles/synthesis.css";
import Additive from "./additive";
import WhatIsSynthesis from "./whatIsSynthesis";

function ComingSoon(props){
    return (
        <>
            <div className="synthesis-content-title">{props.name}</div>
            <div className="synthesis-content-text">Coming Soon...</div>
        </>
    )
}

const menuItems = [
    {
        name: "What is Synthesis?",
        component: <WhatIsSynthesis/>
    }, 
    {
        name: "Additive",
        component: <Additive/>
    }, {
        name: "Subtractive",
        component: <ComingSoon name="Subtractive"/>
    },
    {
        name: "Envelopes",
        component: <ComingSoon name="Envelopes"/>
    },    
    {
        name: "FM",
        component: <ComingSoon name="FM"/>
    },
    {
        name: "Delay",
        component: <ComingSoon name="Delay"/>
    },
    {
        name: "Sampling/Granular",
        component: <ComingSoon name="Sampling/Granular"/>
    },
    {
        name: "Waveshaping",
        component: <ComingSoon name="Waveshaping"/>
    },
    {
        name: "Machine Learning",
        component: <ComingSoon name="Machine Learning"/>
    },
]
class Synthesis extends Component {
    constructor(){
        super();
        this.state = {
            currentItem: 0
        }
    }


    handleLinkClick = i =>{
        this.setState({currentItem: i});
    }

    render(){
        return (
            <div className="synthesis-content">
                <div className="synthesis-menu">
                    {menuItems.map((item, index)=>{
                        let className = "synthesis-menu-item";
                        if (item.name === menuItems[this.state.currentItem].name) {
                            className +=" synthesis-menu-item-active";
                        }
                        return (
                            <div className={className} onClick={e=>this.handleLinkClick(index)} key={item.name}>{item.name}</div>
                        )
                    }
                    )}

                </div>
                <div className="synthesis-content">
                    {menuItems[this.state.currentItem].component}
                </div>
            </div>
        )
    }
}

export default Synthesis;