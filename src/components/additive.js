import React from 'react';
import Tone from "tone";
import { Multislider } from "react-nexusui";
import * as Nexus from "nexusui";

import { convertToLog } from "../utils";
import FrequencyAnalyser from "./frequencyAnalyzer";
import Oscilloscope from "./oscilloscope";

class Additive extends React.Component{
    constructor(){
        super();
        let weights = new Array(32).fill(0);
        weights[0] = 1;
        this.state = {
            weights: weights,
            playing: false
        }
    }
    componentDidMount(){
        this.synth = new Tone.Synth();
        
        this.synth.oscillator.partials = this.state.weights;
        // console.log(this.synth.partials)    
        this.synth.toMaster();
        this.forceUpdate();
    }

    handleWeightsChange = weights => {
        this.setState({weights: weights})
        weights = weights.map(weight=>convertToLog(weight, 0, 1, 0.0001, 1));
        this.synth.oscillator.partials = weights;

    }

    playSynth = e =>{
        this.synth.triggerAttack(440);
        this.setState({playing: true});
    }

    stopSynth = e =>{
        this.synth.triggerRelease();
        this.setState({playing: false});

    }

    render(){
        return (
            <>
                <div className="synthesis-content-title">Additive</div>
                <div className="synthesis-content-text">
                    Additive Synth is Nothing.
                    <div className="synthesis-example-container">
                        {!this.state.playing ? 
                            <button onClick={this.playSynth}>Play</button> :
                            <button onClick={this.stopSynth}>Stop</button>                             
                        }

                        <Multislider 
                        size = {[200, 100]}
                        numberOfSliders = {32}
                        min={0}
                        max={1}
                        values={this.state.weights}
                        onChange = {this.handleWeightsChange}
                        />
                        <div className="synthesis-example-analysis-container">
                            <FrequencyAnalyser signal={this.synth}/>
                            <Oscilloscope signal={this.synth}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Additive;