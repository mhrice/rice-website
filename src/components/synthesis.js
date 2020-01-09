import React, { Component, useState } from 'react';
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

function Synthesis(){
    let [currentItem, setCurrentItem] = useState(0);
    return (
        <div className="synthesis-page">
            <div className="synthesis-menu">
                {menuItems.map((item, index)=>{
                    let className = "synthesis-menu-item";
                    if (item.name === menuItems[currentItem].name) {
                        className +=" synthesis-menu-item-active";
                    }
                    return (
                        <div className={className} onClick={e=>setCurrentItem(index)} key={item.name}>{item.name}</div>
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