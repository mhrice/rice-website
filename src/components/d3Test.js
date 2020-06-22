import React, {useRef, useEffect} from 'react';
import Tone from "tone";
import { Multislider } from "react-nexusui";
import { convertToLog } from "../utils";
import * as d3 from "d3";
import "../styles/d3Test.css";

const dataset = [
    [81.59, 39.14],
    [79.14, 28.81],
    [77.76, 24.41],
    [79.51, 13.33],
    [36.87, 12.88],
    [16.61, 12.38],
    [18.08, 32.88],
    [63.97, 22.08],
    [70.04, 16.46],
    [57.82, 14.68],
];

const Circle = () =>{
    return (
        <svg>
            <circle
                cx="150"
                cy="77"
                r="40"
            />

        </svg>
    )
}

class D3Test extends React.Component {
    constructor(){
        super();
        this.state = {
            values: new Array(1024).fill(0)
        }
    }

    componentDidMount(){
        this.analyser = new Tone.FFT(1024);
        this.connected = false;
        this.startAnalysis();

    }

    startAnalysis = ()=>{
        if(!this.connected && this.props.signal !== undefined){
            this.props.signal.connect(this.analyser);
            this.connected = true;
        }
        let newValues = new Array(1024).fill(0);
        let values = this.analyser.getValue();
        for(let i=0; i < values.length; i++){
            let x = 0;
            let value = values[i];
            if(value < -100) x = 0;
            else if(value > 0) x = 100;
            else x = value + 100; 
            newValues[i] = x;
            // newValues[i] = convertToLog(x, 0, 100, 0.001, 100);
        }
        this.setState({values: newValues})
        requestAnimationFrame(this.startAnalysis);

    }

    render(){
    return (
        <div className="frequency-analyser-container">
            <div className="frequency-analyser-title">D3Test</div>
            <div className="D3-container">
                <Circle/>


            </div>
        </div>
    )}
}
export default D3Test;