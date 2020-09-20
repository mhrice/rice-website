import React from 'react';
import Tone from "tone";

import XYController from "./xyController";
import AnalysisGraph from "./analysisGraph";
import {getFreq, getGain} from "../utils";

import "../styles/demoContainer.css"


class DemoContainer extends React.Component {
    constructor(){
        super()
        this.demoRef = React.createRef()
        this.analysisGraphRef = React.createRef();
        this.state = {
            width: 0,
            height: 0
        }

    }

    componentDidMount(){
        let rect = this.demoRef.current.getBoundingClientRect();
        this.setState({
            width: rect.width,
            height: rect.height
        })
    }

    onXYPointerDown = (x, y) => {
        let freq = getFreq((1 - y), 50, 8000);
        let volume = getGain((1 - x), 0, -30);
        if(this.props.trigger){
            this.analysisGraphRef.current.startTrigger(freq, volume);
        }
        this.props.onXYPointerDown(x, y);
    }

    onXYPointerMove = (x, y) =>{
        let freq = getFreq((1 - y), 50, 8000);
        let volume = getGain((1 - x), 0, -30);
        if (this.props.trigger) {
            this.analysisGraphRef.current.startTrigger(freq, volume);
        }
        this.props.onXYPointerMove(x, y);

    }

    onXYPointerUp = () => {
        if (this.props.trigger) {
            this.analysisGraphRef.current.startTrigger(0, 0);
        }
        this.props.onXYPointerUp();

    }

    handleSustainToggle = () => {
        this.props.handleSustainToggle();
        if(this.props.trigger){
            this.analysisGraphRef.current.startTrigger(0, 0);
        }
    }

    resetSignal = () =>{
        this.analysisGraphRef.current.resetSignal();
    }

    render(){
        let demoStyle;
        if (this.props.disabled){
            demoStyle = {
                "cursor": "notAllowed",
                "pointerEvents": "none"
            }
        }
        return (
            <div className="demo-container" style={demoStyle}>
                {this.props.children}
                <div className="demo-graphs" ref={this.demoRef}>
                    <XYController 
                        height = {300} 
                        width = {175} 
                        onPointerDown={this.onXYPointerDown} 
                        onPointerMove={this.onXYPointerMove} 
                        onPointerUp={this.onXYPointerUp}
                        handleSustainToggle={this.handleSustainToggle}
                        setForSynthIntro={this.props.disabled}
                        />
                    <AnalysisGraph height = {300} signal={this.props.signal} ref={this.analysisGraphRef} trigger={this.props.trigger}/>
                </div>
            </div>

        );
    }
}

DemoContainer.defaultProps = {
    trigger: true
}
export default DemoContainer;