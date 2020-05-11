import React, { Component, useState } from 'react';
import "../styles/synthesis.css";
import Additive from "./additive";
import WhatIsSynthesis from "./whatIsSynthesis";

import { ReactComponent as Technology } from '../resources/technology.svg';
import { ReactComponent as Level } from '../resources/level.svg';
import { ReactComponent as Filter } from '../resources/filter.svg';
import { ReactComponent as ADSR } from '../resources/adsr.svg';
import { ReactComponent as Delay } from '../resources/delay.svg';
import { ReactComponent as Sampling } from '../resources/sampling.svg';
import { ReactComponent as FM } from '../resources/fm.svg';



function ComingSoon(props){
    return (
        <>
            <div className="synthesis-content-title">{props.name}</div>
            <div className="synthesis-content-text">Coming Soon...</div>
        </>
    )
}

const iconAttr = `Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>`;

const menuItems = [
    {
        name: "What is Synthesis?",
        component: <WhatIsSynthesis/>,
        icon: <Technology className="synthesis-menu-item-icon" width={20} height={20}/>
    }, 
    {
        name: "Additive",
        component: <Additive/>,
        icon: <Level className="synthesis-menu-item-icon" width={20} height={20}/>
    }, {
        name: "Subtractive",
        component: <ComingSoon name="Subtractive"/>,
        icon: <Filter className="synthesis-menu-item-icon" width={20} height={20}/>
    },
    {
        name: "Envelopes",
        component: <ComingSoon name="Envelopes"/>,
        icon: <ADSR className="synthesis-menu-item-icon" width={20} height={20}/>
    },    
    {
        name: "FM",
        component: <ComingSoon name="FM"/>,
        icon: <FM className="synthesis-menu-item-icon" width={20} height={20}/>
    },
    {
        name: "Delay",
        component: <ComingSoon name="Delay"/>,
        icon: <Delay className="synthesis-menu-item-icon" width={20} height={20}/>
    },
    {
        name: "Sampling/Granular",
        component: <ComingSoon name="Sampling/Granular"/>,
        icon: <Sampling className="synthesis-menu-item-icon" width={20} height={20}/>
    }//,
    // {
    //     name: "LFOs",
    //     component: <ComingSoon name="LFOs"/>,
    //     icon: <Technology className="synthesis-menu-item-icon" width={20} height={20}/>
    // },    
    // {
    //     name: "Waveshaping",
    //     component: <ComingSoon name="Waveshaping"/>,
    //     icon: <Technology className="synthesis-menu-item-icon" width={20} height={20}/>
    // },
    // {
    //     name: "Machine Learning",
    //     component: <ComingSoon name="Machine Learning"/>,
    //     icon: <Technology className="synthesis-menu-item-icon" width={20} height={20}/>
    // },
]

function Synthesis(){
    let [currentItem, setCurrentItem] = useState(1);
    let [hover, setHover] = useState(0);
    return (
        <div className="synthesis-page">
            <div className="synthesis-menu" onMouseOver={e=>setHover(1)} onMouseOut={e=>setHover(0)}>
                {menuItems.map((item, index)=>{
                    let className = "synthesis-menu-item";
                    let textColor = "rgba(255, 255, 255, 0.7)";
                    let arrowDisplay = "none";
                    let textDisplay = "block";
                    if (item.name === menuItems[currentItem].name) {
                        className +=" synthesis-menu-item-active";
                        arrowDisplay = "block";
                        textColor = "white";                        
                    }
                    if(!hover){
                        arrowDisplay = "none";
                        textDisplay = "none";
                    }
                    
                    return (
                        <div className={className} onClick={e=>setCurrentItem(index)} key={item.name}>
                            {/* <Level className="synthesis-menu-item-icon" width={20} height={20} /> */}
                            {item.icon}
                            <div className="synthesis-menu-item-text" style={{color: textColor, display: textDisplay}}>{item.name}</div>
                            <div className="synthesis-menu-arrow" style={{"display": arrowDisplay}}></div>
                        </div>
                        
                    )   
                }
                )}

            </div>
            <div className="synthesis-content">
                {menuItems[currentItem].component}
            </div>
            
        </div>
    )
}

export default Synthesis;