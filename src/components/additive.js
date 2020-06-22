import React from 'react';
import Tone from "tone";
import { Multislider, Select, Number } from "react-nexusui";
import * as Nexus from "nexusui";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faChevronLeft, faChevronRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { convertToLog, arrMax, arrSum, getFreq, getGain } from "../utils";
import FrequencyAnalyser from "./frequencyAnalyzer";
import Oscilloscope from "./oscilloscope";
import D3Test from "./d3Test";
import DemoContainer from './demoContainer';

import "../styles/additive.css"

const MAX_WEIGHTS = 32;

function AdditiveDemo(props){
    return (
        <div className="additive-demo-container">
            Presets
            <div className="harmonic-controller">
                <div className="harmonic-title">Harmonics</div> 
                <div className="harmonic-input-container">
                    <FontAwesomeIcon className="harmonic-delete-add" icon={faMinus} onClick={()=>{props.deleteWeight()}}/>
                    {/* <div className="harmonic-delete-add">-</div> */}
                    <input className="harmonic-input" type="number" value={props.weightInput} onChange={props.setNumWeights} onKeyUp={props.setNumWeights} />
                    <FontAwesomeIcon className="harmonic-delete-add" icon={faPlus} onClick={()=>{props.addWeight()}}/>
                    {/* <div className="harmonic-delete-add">+</div> */}

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
            preset: 0,
            weightInput: 1
        }
        this.analyserRef = React.createRef();
    }
    componentDidMount(){
        this.synth = new Tone.Synth();
        
        this.synth.oscillator.partials = this.state.weights;
        this.synth.volume.value = 0;
        this.synth.toMaster();
        this.setState({preset: 0});
    }

    handleWeightsChange = weights => {
        let max = arrMax(weights);
        let sum = arrSum(weights) - max;
        let dist = Math.abs(Math.sqrt(Math.sqrt(sum)) - 0.5);
        let newGain = Math.log2(dist) * 2;
        this.synth.volume.exponentialRampToValueAtTime(newGain, this.synth.context.now() + 0.2);
        this.setState({
            weights: weights,
            preset: 4
        });
        this.synth.oscillator.partials = weights;
    }

    handlePresetChange = preset => {
        // let weights = new Array(NUM_WEIGHTS).fill(0);
        let weights = [1];
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
            let max = arrMax(weights);
            let sum = arrSum(weights) - max;
            let dist = Math.abs(Math.sqrt(Math.sqrt(sum)) - 1);
            let newGain = Math.log2(dist) * 2;
            this.synth.volume.exponentialRampToValueAtTime(newGain,this.synth.context.now() + 0.2);
            this.setState({weights: weights});
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
        let freq = getFreq((1 - y), 50, 5000);
        let volume = getGain((1 - x), 0, -30);
        this.synth.triggerAttack(freq);
        this.synth.volume.value = volume;
        this.playing = true;
    }

    onXYPointerMove = (x, y) => {
        if(this.playing){
            let freq = getFreq((1 - y), 50, 5000);
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
                    Pianos and guitars sound different because the relative amplitudes or <i>weights</i> of their harmonics are different.
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
                    />
                </DemoContainer>
                {/* <D3Test/> */}
                {/*
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
                        {this.state.weights.map((weight, index)=>{
                            return (
                            <Number 
                            size={[21, 25]}
                            min={0}
                            max={1}
                            step={0.001}
                            value={weight}
                            key = {index}
                            />
                            )
                        })}
                        </div>
                    </div>
                    <div className="synthesis-example-analysis-container">
                        <Oscilloscope signal={this.synth}/>
                        <FrequencyAnalyser signal={this.synth} ref={this.analyserRef}/>
                    </div>
                </div>
                    */}
            </>
        )
    }
}
export default Additive;