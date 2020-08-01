import React from 'react';
import * as Tone from "tone"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { convertToLog, arrMax, arrSum, getFreq, getGain } from "../utils";
import DemoContainer from './demoContainer';

import "../styles/additive.css"

const MAX_WEIGHTS = 32;
const presets = ["Sine", "Square", "Saw", "Triangle", "Random", "Mystery"]

function AdditiveDemo(props){
    return (
        <div className="additive-demo-container">
            <div className="harmonic-controller-container">
                <div className="harmonic-number-container">
                    <div className="harmonic-title">Harmonics</div> 
                    <div className="harmonic-input-container">
                        <FontAwesomeIcon className="harmonic-delete-add" icon={faMinus} onClick={()=>{props.deleteWeight()}}/>
                        {/* <div className="harmonic-delete-add">-</div> */}
                        <input className="harmonic-input" type="number" value={props.weightInput} onChange={props.setNumWeights} onKeyUp={props.setNumWeights} />
                        <FontAwesomeIcon className="harmonic-delete-add" icon={faPlus} onClick={()=>{props.addWeight()}}/>
                        {/* <div className="harmonic-delete-add">+</div> */}

                    </div>
                </div>
                <div className="harmonic-presets-container">
                    <div className="harmonic-preset-title">Presets</div>
                    <div className="harmonic-presets-list">
                        {presets.map(preset=>{
                            let presetBorder = "2px solid transparent";
                            if(props.preset === preset){
                                presetBorder = "2px solid rgb(9, 160, 206)";
                            }
                          return (
                            <div
                                className="harmonic-preset" 
                                key={preset} 
                                onClick={()=>props.handlePresetChange(preset)} 
                                style={{"border": presetBorder, "padding": "1px 3px"}}
                            >
                                {preset}
                            </div>
                          )
                        })}
                    </div>
                </div>

            </div>
            <div className="weights-container">
            {/* <FontAwesomeIcon icon={faTimesCircle} className="weight-delete" onClick={()=>{props.deleteWeight()}}/>   */}
            {props.weights.map((weight, index)=>{
                return (
                    <div className="weight-container" key={index}>
                        <div className="weight-slider-wrapper">
                            <input className="weight-slider" type="range" onChange={(e)=>{props.setWeight(index, e)}} value={weight*100}/>
                        </div>
                        <div className="weight-label">{Math.round(weight*100)/100}</div>
                         
                    </div>
                )
            })}
            {/* {props.weights.length < MAX_WEIGHTS && 
                <FontAwesomeIcon icon={faPlusCircle} className="add-weight" onClick={props.addWeight}/>
            } */}
            </div>
        </div>
    )
    
}


class Additive extends React.Component{
    constructor(){
        super();
        let weights = [1];
        this.state = {
            weights: weights,
            playing: false,
            preset: "Sine",
            weightInput: 1
        }
        this.analyserRef = React.createRef();
    }
    componentDidMount(){
        this.synth = new Tone.Synth();
        
        this.synth.oscillator.partials = this.state.weights;
        this.synth.volume.value = 0;
        this.synth.toMaster();
        this.forceUpdate();
    }

    handleWeightsChange = weights => {
        let max = arrMax(weights);
        let sum = arrSum(weights) - max;
        let dist = Math.abs(Math.sqrt(Math.sqrt(sum)) - 0.5);
        let newGain = Math.log2(dist) * 2;
        // this.synth.volume.exponentialRampToValueAtTime(newGain, this.synth.context.now() + 0.2);
        this.setState({
            weights: weights,
            preset: "Custom"
        });
        this.synth.oscillator.partials = weights;
    }

    handlePresetChange = preset => {
        let weights = new Array(MAX_WEIGHTS).fill(0);
        // let weights = [1];
        let weightUpdate = true;
        switch(preset){
            case "Sine": 
                // Sine
                weights = [1];
                break
            case "Square":
                // Square
                for(let i = 0; i < weights.length; i++){
                    if(i % 2 === 0){
                        weights[i] = 1 / (i + 1);
                    }
                }
                break;
            case "Saw":
                // Saw
                for (let i = 0; i < weights.length; i++) {
                        weights[i] = 1 / (i + 1);
                }
                break;
            case "Triangle":
                // Triangle
                for (let i = 0; i < weights.length; i++) {
                    if (i % 2 === 0) {
                        weights[i] = 1 / ((i+1)*(i+1));
                    }
                }
                break;
            
            case "Random":
                // Random, max of 0.8
                weights[0] = 1;
                for (let i = 1; i < weights.length; i++) {
                    weights[i] = Math.random()*0.8;
                }
                break;
            default:
                weights[0] = 1;
                break;
        }
        this.setState({preset: preset});
        if(weightUpdate){
            let max = arrMax(weights);
            let sum = arrSum(weights) - max;
            let dist = Math.abs(Math.sqrt(Math.sqrt(sum)) - 1);
            let newGain = Math.log2(dist) * 2;
            // let oldGain = this.synth.volume.value;
            // console.log(newGain, oldGain)
            // this.synth.volume.exponentialRampToValueAtTime(newGain,this.synth.context.now() + 0.2);
            this.setState({weights: weights, weightInput: weights.length});
            this.synth.oscillator.partials = weights;
        }
            
    }
    handleFreqChange = val => {
        this.setState({freq: val})
        this.synth.frequency.value = val;
    }


    stopSynth = e =>{
        this.synth.triggerRelease();
        this.setState({playing: false});

    }

    addWeight = () =>{
        if(this.state.weights.length < MAX_WEIGHTS){
            let newWeights = [...this.state.weights, 0.5]
            this.setState({
                weights: newWeights,
                weightInput: this.state.weights.length + 1
               
            })
            this.handleWeightsChange(newWeights);
        }
    }

    setWeight = (index, e) =>{
        let newWeights = [];
        Object.assign(newWeights, this.state.weights)
        newWeights.splice(index, 1, e.target.value/100)
        this.setState({
            weights: newWeights,
        })
        this.handleWeightsChange(newWeights);
    }

    deleteWeight = () =>{
        if (this.state.weights.length > 1) {
            let newWeights = [];
            Object.assign(newWeights, this.state.weights)
            newWeights.pop()
            this.setState({
                weights: newWeights,
                weightInput: newWeights.length
                
            })
            this.handleWeightsChange(newWeights);
        }
    }

    setNumWeights = (e) =>{

        if (e.key === "Enter") {
            let newNumberOfWeights = parseInt(e.target.value, 10);
            let newWeights = [];
            Object.assign(newWeights, this.state.weights)
            // Clamp
            if(newNumberOfWeights < 1){
                newNumberOfWeights = 1;
            }
            if(newNumberOfWeights > 32){
                newNumberOfWeights = 32;
            }
            let weightsToAdd = newNumberOfWeights - newWeights.length;
            if (weightsToAdd > 0) {
                for (let i = 0; i < weightsToAdd; i++) {
                    newWeights.push(0.5)
                }
            }
            else {
                for (let i = 0; i < -1 * weightsToAdd; i++) {
                    newWeights.pop()
                }
            }
            this.setState({
                weights: newWeights,
                weightInput: newNumberOfWeights
            })
            this.handleWeightsChange(newWeights);
        } else {
            this.setState({weightInput: e.target.value})
        }
    }

    onXYPointerDown = (x, y) => {
        let freq = getFreq((1 - y), 50, 8000);
        let volume = getGain((1 - x), 0, -30);
        this.synth.triggerAttack(freq);
        this.synth.volume.value = volume;
        this.playing = true;
    }

    onXYPointerMove = (x, y) => {
        if(this.playing){
            let freq = getFreq((1 - y), 50, 8000);
            let volume = getGain((1 - x), 0, -30);
            this.synth.frequency.value = freq;
            this.synth.volume.value = volume;
        }   
    }

    onXYPointerUp = (x, y) => {
        if(!this.sustain){
            this.synth.triggerRelease();
            this.playing = false;
        }
    }

    handleSustainToggle = () =>{
        this.sustain = !this.sustain;
        this.synth.triggerRelease();
        this.playing = false;
        this.sustainFreq = this.synth.frequency.value;
        this.sustainVol = this.synth.volume.value;
    }

    render(){
        return (
            <>
                <div className="synthesis-content-title">Additive</div>
                <div className="synthesis-content-text">
                    Additive synthesis is the process of creating a sound using a summation of oscillators.
                    When you pluck a string on a guitar, or play a note on a piano, the sound you're hearing is mostly made up 
                    of the the note you played, but also consists of other notes too! These notes/frequencies are called harmonics. 
                    <br/><br/>
                    They are usually integer multiples of the original frequency - which is called the fundamental frequency. 
                    For example, if 440 Hz (A4) was the fundamental, you would have harmonics at 880 Hz, 1320 Hz, and so on. 
                    Pianos and guitars sound different because the relative amplitudes or <b>weights</b> of their harmonics are different.
                    Try adding harmonics and changing the sliders below to see this in action. 
                     
                </div>
                <DemoContainer 
                    onXYPointerDown={this.onXYPointerDown} 
                    onXYPointerMove={this.onXYPointerMove} 
                    onXYPointerUp={this.onXYPointerUp}
                    handleSustainToggle={this.handleSustainToggle}
                    signal={this.synth}
                >
                    <AdditiveDemo 
                        weights = {this.state.weights} 
                        addWeight={this.addWeight} 
                        setWeight={this.setWeight} 
                        deleteWeight={this.deleteWeight} 
                        setNumWeights={this.setNumWeights} 
                        weightInput={this.state.weightInput}
                        preset={this.state.preset}
                        handlePresetChange={this.handlePresetChange}
                    />
                </DemoContainer>
                
            </>
        )
    }
}
export default Additive;