import React from 'react';
import * as Tone from "tone"
import { convertToLog, arrMax, arrSum, getFreq, getGain } from "../utils";
import DemoContainer from './demoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretLeft, faCaretRight, faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

import "../styles/modulation.css"

const modulationPresets = ["Vibrato", "Tremolo", "Pad", "Fortepiano", "Swell Up/Down"]

function ModulationDemo(props) {
    let modulationTypeBackground = props.modulationType === "am" ? "#93204C" : "#773AA6";
    let modulationLockBackground = props.modulationRatioLock ? "#616161" : "transparent";
    let modulationLockColor = props.modulationRatioLock ? "#EEEEEE" : "#616161";
    let modulationFrequencyText = props.modulationRatioLock ? props.modulationFrequency + "f" : props.modulationFrequency + " Hz"
    
    return (
        <div className="modulation-demo-container">
            <div className="modulation-sound-selection-container">
                <div className="modulation-sound-selection-switch-container">
                    <div className="harmonic-preset-title">Modulation Type</div>
                    <div className = "modulation-switch-container" style={{"backgroundColor": modulationTypeBackground}} onClick={props.handleModulationTypeChange}>
                        {props.modulationType === "am" ? "AM" : "FM"}
                    </div>
                </div>
                <div className="modulation-presets-container">
                    <div className="harmonic-preset-title">Modulation Presets</div>
                    <div className="harmonic-presets-list">
                        {modulationPresets.map(preset=>{
                            let presetBorder = "2px solid transparent";
                            if(props.modulationPreset === preset){
                                presetBorder = "2px solid rgb(9, 160, 206)";
                            }
                            return (
                            <div
                                className="harmonic-preset" 
                                key={preset} 
                                onClick={()=>props.handleModulationPresetChange(preset)} 
                                style={{"border": presetBorder, "padding": "1px 3px"}}
                            >
                                {preset}
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="modulation-sliders-container">
                <div className="modulation-title">Modulation Frequency</div>
                <div className="modulation-frequency-ratio-lock-container" 
                    style={{"backgroundColor": modulationLockBackground, "color": modulationLockColor}} 
                    onClick={props.handleModulationLockChange}>
                    Lock Ratio
                </div>
                <input className="modulation-slider" min = {0.5} max = {20} step={0.1} type="range" onChange={(e)=>{props.handleModulationChange(e, "frequency")}} value={props.modulationFrequency}/>               
                <div className="modulation-amount">{modulationFrequencyText}</div>
                <div className="modulation-title">Modulation Depth</div>
                <input className="modulation-slider" type="range" onChange={(e)=>{props.handleModulationChange(e, "depth")}} value={props.modulationDepth}/>               
                <div className="modulation-amount">{props.modulationDepth + "%"}</div>
            </div>
        </div>
    )
}

class Modulation extends React.Component {
    constructor(){
        super();
        this.state = {
            waveSelection: "Sawtooth",
            modulationPreset: "Default",
            modulationType: "am",
            modulationFrequency: 1,
            modulationDepth: 20,
            modulationRatioLock: true
        }
        this.demoContainRef = React.createRef();
    }

    componentDidMount(){
        this.synth = new Tone.Synth();
        this.synth.toDestination();
        this.synth.oscillator.type = "sawtooth";
        this.modulator = new Tone.Synth();
        this.synth.volume.value = 0;
        this.modulator.volume.value = 0;
        this.modulator.connect(this.synth.volume);
    }   

    onXYPointerDown = (x, y) =>{
        let freq = getFreq((1 - y), 50, 8000);
        let volume = getGain((1 - x), 0, -30);
        this.synth.volume.value = volume;
        this.synth.triggerAttack(freq);
        this.playing = true;
    }

    onXYPointerMove = (x, y) =>{
        if (this.playing) {
            let freq = getFreq((1 - y), 50, 8000);
            let volume = getGain((1 - x), 0, -30);
            this.synth.frequency.value = freq;
            this.synth.volume.value = volume;
        }
    }

    onXYPointerUp = (x, y) =>{
        if (!this.sustain) {
            this.synth.triggerRelease();
            this.playing = false;
        }
    }

    handleSustainToggle = () => {
        this.sustain = !this.sustain;
        this.synth.triggerRelease();
        this.playing = false;
        this.sustainVol = this.synth.volume.value;
    }


    handleModulationPresetChange = modulationPreset =>{
        let attack, decay, sustain, release;
        switch(modulationPreset){
            case "Default": 
                attack = 0.2;
                decay = 0.2;
                sustain = 0.5;
                release = 0.5;
            break
            case "Pluck":
                attack = 0.01;
                decay = 0.1;
                sustain = 0.2;
                release = 0.2;
            break
            case "Pad":
                attack = 0.67;
                decay = 0.1;
                sustain = 0.8;
                release = 0.8;
            break
            case "Fortepiano":
                attack = 0.01;
                decay = 0.2;
                sustain = 0.05;
                release = 1;
            break
            case "Swell Up/Down":
                attack = 0.25;
                decay = 0.5;
                sustain = 0.1;
                release = 0.2;
            break
            default: 
                attack = 0.2;
                decay = 0.2;
                sustain = 0.5;
                release = 0.5;
        }
        this.synth.modulation.attack = attack;
        this.synth.modulation.decay = decay;
        this.synth.modulation.sustain = sustain;
        this.synth.modulation.release = convertToLog(release, 0.01, 1, 0.1, 10);
        let sustainEnd = 0.8 * this.state.modulationWidth;

        let newModulationPositions = {
            attack: attack * this.state.modulationWidth,
            decay: (decay + attack) * this.state.modulationWidth,
            sustain: (1 - sustain) * this.state.modulationHeight,
            release: (this.state.modulationWidth - sustainEnd) * release + sustainEnd
        }
        this.setState({modulationPositions: newModulationPositions, modulationPreset: modulationPreset});
    }

    handleModulationTypeChange = () =>{
        this.setState({modulationType: (this.state.modulationType === "am") ? "fm": "am"})
    }

    handleModulationLockChange = () => this.setState({modulationRatioLock: !this.state.modulationRatioLock})

    handleModulationChange = (e, modulationChange) =>{
        if(modulationChange === "frequency"){
            let newFreq = e.target.value;
            if(newFreq !== ("0.5") ){
                newFreq = Math.round(newFreq)
            } 

            this.setState({modulationFrequency: newFreq })
            
        } else {
            this.setState({modulationDepth: e.target.value })

        }
    }


    render(){
        
        
        return (
            <>
                <div className="synthesis-content-title">Modulation Synthesis</div>
                <div className="synthesis-content-text">
                    Modulation Text
                </div>
                <DemoContainer 
                    onXYPointerDown={this.onXYPointerDown} 
                    onXYPointerMove={this.onXYPointerMove} 
                    onXYPointerUp={this.onXYPointerUp}
                    handleSustainToggle={this.handleSustainToggle}
                    signal={this.synth}
                    ref={this.demoContainRef}
                >
                    <ModulationDemo
                        modulationType = {this.state.modulationType}
                        modulationFrequency={this.state.modulationFrequency}
                        modulationDepth={this.state.modulationDepth}
                        modulationRatioLock={this.state.modulationRatioLock}
                        handleModulationTypeChange = {this.handleModulationTypeChange}
                        handleModulationLockChange = {this.handleModulationLockChange}
                        handleModulationChange = {this.handleModulationChange}
                    />
                </DemoContainer>            
            </>
        )
    }

}

export default Modulation;