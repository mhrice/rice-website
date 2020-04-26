import React from 'react';
import Tone from "tone";
import { Multislider, Select, Number } from "react-nexusui";
import * as Nexus from "nexusui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

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
            playing: false,
            preset: 0,
            freq: 440
        }
    }
    componentDidMount(){
        this.synth = new Tone.Synth();
        
        this.synth.oscillator.partials = this.state.weights;
        this.synth.toMaster();
        this.setState({preset: 0});
    }

    handleWeightsChange = weights => {
        this.setState({weights: weights})
        // weights = weights.map(weight=>convertToLog(weight, 0, 1, 0.0001, 1));
        this.synth.oscillator.partials = weights;
        this.setState({preset: 4});
    }

    handlePresetChange = preset => {
        let weights = new Array(32).fill(0);
        let weightUpdate = true;
        switch(preset.index){
            case 0: 
                // Sine
                weights[0] = 1;
                break
            case 1:
                // Square
                for(let i = 0; i < weights.length; i++){
                    if(i % 2 === 0){
                        weights[i] = 1 / (i + 1);
                    }
                }
                break;
            case 2:
                // Saw
                for (let i = 0; i < weights.length; i++) {
                        weights[i] = 1 / (i + 1);
                }
                break;
            case 3:
                // Triangle
                for (let i = 0; i < weights.length; i++) {
                    if (i % 2 === 0) {
                        weights[i] = 1 / ((i+1)*(i+1));
                    }
                }
                break;
            case 4:
                weightUpdate = false;
                break;
            default:
                weights[0] = 1;
                break;
        }
        this.setState({preset: preset.index});
        if(weightUpdate){
            this.synth.oscillator.partials = weights;
            // weights = weights.map(weight => convertToLog(weight, 0, 1, 0.0001, 1));
            this.setState({weights: weights});
        }
            
    }
    handleFreqChange = val => {
        this.setState({freq: val})
        this.synth.frequency.value = val;
    }
    playSynth = e =>{
        this.synth.triggerAttack(this.state.freq);
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
                    Additive synthesis is when you eat cake
                    Additive synthesis is when you eat cake
                    Additive synthesis is when you eat cake
                    Additive synthesis is when you eat cake
                    Additive synthesis is when you eat cake
                    Additive synthesis is when you eat cake
                    Additive synthesis is when you eat cake
                    Additive synthesis is when you eat cake

                </div>
                <div className="synthesis-example-container">
                    {!this.state.playing ? 
                        <button onClick={this.playSynth}><FontAwesomeIcon icon={faPlay}/></button> :
                        <button onClick={this.stopSynth}><FontAwesomeIcon icon={faStop}/></button>                             
                    }
                    <div className="synthesis-freq-container">
                        <div className="synthesis-label">Frequency (Hz)</div>
                            <div className="synthesis-freq-number-container">
                            <Number 
                            size={[50, 25]}
                            min={20}
                            max={4000}
                            step={1}
                            value={this.state.freq}
                            onChange={this.handleFreqChange}/>
                            </div>
                        </div>
                    <div className="synthesis-preset-container">
                        <div className="synthesis-label">Presets</div>
                        <Select 
                        size={[75, 25]}
                        className="synthesis-example-preset-menu"
                        options = {["Sine", "Square", "Saw", "Triangle", "Custom"]}
                        selectedIndex={this.state.preset}
                        onChange = {this.handlePresetChange}
                        />
                    </div>
                    <div className="synthesis-partials-container"> 
                        <div className="synthesis-label">Partials</div>
                        <Multislider 
                        size = {[664, 100]}
                        numberOfSliders = {32}
                        min={0}
                        max={1}
                        values={this.state.weights}
                        onChange = {this.handleWeightsChange}
                        />
                    </div>
                    <div className="synthesis-example-analysis-container">
                        <Oscilloscope signal={this.synth}/>
                        <FrequencyAnalyser signal={this.synth}/>
                    </div>
                </div>
            </>
        )
    }
}
export default Additive;