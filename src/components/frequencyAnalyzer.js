import React from 'react';
import Tone from "tone";
import { Multislider } from "react-nexusui";
import { convertToLog } from "../utils";
import "../styles/frequencyAnalyzer.css";

class FrequencyAnalyser extends React.Component {
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
            <div className="frequency-analyser-title">Frequency</div>
        <Multislider
                size = {[300, 100]}
                numberOfSliders = {1024}
                min={0}
                max={100}
                values={this.state.values} 
                mode="line"
                className="frequency-analyser"

        />
        </div>
    )}
}
export default FrequencyAnalyser;