import React from 'react';
import Tone from "tone";
import { Multislider, Select, Number } from "react-nexusui";
import * as Nexus from "nexusui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';

import { convertToLog, arrMax, arrSum } from "../utils";
import FrequencyAnalyser from "./frequencyAnalyzer";
import Oscilloscope from "./oscilloscope";

const NUM_WEIGHTS = 32;

class Additive extends React.Component{
    constructor(){
        super();
        let weights = new Array(NUM_WEIGHTS).fill(0);
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
        this.synth.volume.value = 0;
        this.synth.toMaster();
        this.setState({preset: 0});
    }

    handleWeightsChange = weights => {
        let sum = arrSum(weights);
        // let newGain;
        // if (sum === 0) {
        //     newGain = -Infinity;
        // } else {
        //     newGain = 2 * Math.log10(1 / sum);
        //     // newGain = 0;
        // }
        this.setState({weights: weights, preset: 4});
        weights = weights.map(weight =>{
            return +convertToLog(weight, 0, 1, 0.001, 1).toFixed(2);
        })
        console.log(weights)
        // this.synth.volume.exponentialRampToValueAtTime(newGain,this.synth.context.now() + 0.2);
        this.synth.oscillator.partials = weights;
        // console.log(newGain);
    }

    handlePresetChange = preset => {
        let weights = new Array(NUM_WEIGHTS).fill(0);
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
            case 5:
                for (let i = 0; i < weights.length; i++) {
                    weights[i] = 1 ;
                }
                break;
            default:
                weights[0] = 1;
                break;
        }
        this.setState({preset: preset.index});
        if(weightUpdate){
            let sum = arrSum(weights);
            let newGain;
            if(sum === 0){
                newGain = -Infinity;
            } else {
                newGain = 2* Math.log10(1/sum);
                // newGain = 0;
            }

            this.synth.volume.exponentialRampToValueAtTime(newGain,this.synth.context.now() + 0.2);
            this.synth.oscillator.partials = weights;
            console.log(newGain);
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
                    {this.state.weights.map((weight)=>{
                        return "Additive synthesis is when you eat cake"
                    })}


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
                        options = {["Sine", "Square", "Saw", "Triangle", "Custom", "5"]}
                        selectedIndex={this.state.preset}
                        onChange = {this.handlePresetChange}
                        />
                    </div>
                    <div className="synthesis-partials-container"> 
                        <div className="synthesis-label">Partials</div>
                        <Multislider 
                        size = {[672, 100]}
                        numberOfSliders = {NUM_WEIGHTS}
                        min={0}
                        max={1}
                        candycane={NUM_WEIGHTS}
                        values={this.state.weights}
                        onChange = {this.handleWeightsChange}
                        />
                        <div className="synthesis-partials-values-container">
                        {this.state.weights.map(weight=>{
                            return (
                            <Number 
                            size={[21, 25]}
                            min={0}
                            max={1}
                            step={0.001}
                            value={weight}
                            />
                            )
                        })}
                        </div>
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