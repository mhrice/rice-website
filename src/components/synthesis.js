import React, { Component } from 'react';
import "../styles/synthesis.css";

const menuItems = ["What is Synthesis?", "Additive", "Subtractive", "FM", "Delay", "Sampling/Granular", "Waveshaping", "Envelopes"]
class Synthesis extends Component {
    constructor(){
        super();
        this.state = {
            currentItem: "What is Synthesis?"
        }
    }


    handleLinkClick = e =>{
        this.setState({currentItem: e.target.innerHTML});
    }

    render(){
        return (
            <div className="synthesis-content">
                <div className="synthesis-menu">
                    {menuItems.map(item=>{
                        let className = "synthesis-menu-item";
                        if(item === this.state.currentItem){
                            className +=" synthesis-menu-item-active";
                        }
                        return (
                            <div className={className} onClick={this.handleLinkClick} key={item}>{item}</div>
                        )
                    }
                    )}

                </div>
            </div>
        )
    }
}

export default Synthesis;