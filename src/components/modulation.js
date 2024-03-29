import React from 'react';
import * as Tone from "tone"
import { getFreq, getGain } from "../utils";
import DemoContainer from './demoContainer';

import "../styles/modulation.css"

const modulationPresets = ["Tremolo", "Vibrato", "Bass", "Bell", "Mystery"]

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
            modulationPreset: "",
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
        this.synth.oscillator.type = "sine";
        this.modulator = new Tone.Synth();
        this.synth.volume.value = -Infinity;
        this.modulator.volume.value = -Infinity;
        this.modulator.connect(this.synth.volume);
        this.modulator.triggerAttack(1);
    }   

    componentWillUnmount(){
        this.synth.triggerRelease();
    }

    onXYPointerDown = (x, y) =>{
        let freq = getFreq((1 - y), 50, 8000);
        let volume = getGain((1 - x), 0, -30);
        this.synth.volume.value = volume;
        this.synth.triggerAttack(freq);
        this.playing = true;

        let newModulatorFreq = this.state.modulationFrequency;
        if (newModulatorFreq !== ("0.5")) {
            newModulatorFreq = Math.round(newModulatorFreq)
        }
        let relativeModulatorFreq = newModulatorFreq;
        if (this.state.modulationRatioLock) {
            relativeModulatorFreq *= this.synth.frequency.value;
        }
        this.modulator.frequency.value = relativeModulatorFreq;

        
        if (this.state.modulationType === "am") {
            // 20 log10 (x) = -20
            // 10^val/20 
            let newModulatorVolume = 20 * Math.log10((this.state.modulationDepth / 100) * Math.pow(10, this.synth.volume.value / 20));
            this.modulator.volume.value = newModulatorVolume;
        } else {
            // Map between 0 and 5
            this.modulator.volume.value = 20 * Math.log10((this.state.modulationDepth / 100) * 10 * relativeModulatorFreq);
            console.log(20 * Math.log10((this.state.modulationDepth / 100) * 10 * relativeModulatorFreq));
        }
        this.forceUpdate()
    }

    onXYPointerMove = (x, y) =>{
        if (this.playing) {
            let freq = getFreq((1 - y), 50, 8000);
            let volume = getGain((1 - x), 0, -30);
            this.synth.frequency.value = freq;
            this.synth.volume.value = volume;

            let newModulatorFreq = this.state.modulationFrequency;
            if (newModulatorFreq !== ("0.5")) {
                newModulatorFreq = Math.round(newModulatorFreq)
            }
            let relativeModulatorFreq = newModulatorFreq;
            if (this.state.modulationRatioLock) {
                relativeModulatorFreq *= this.synth.frequency.value;
            }
            this.modulator.frequency.value = relativeModulatorFreq;
            if (this.state.modulationType === "am") {
                // 20 log10 (x) = -20
                // 10^val/20 
                let newModulatorVolume = 20 * Math.log10((this.state.modulationDepth / 100) * Math.pow(10, this.synth.volume.value / 20));
                this.modulator.volume.value = newModulatorVolume;
            } else {
                // Map between 0 and 5
                this.modulator.volume.value = 20 * Math.log10((this.state.modulationDepth / 100) * 10 * relativeModulatorFreq);
            }
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
        let modulationType, modulationFrequency, modulationDepth, modulationRatioLock;
        switch(modulationPreset){
            case "Tremolo": 
                modulationType = "am";
                modulationFrequency = 4;
                modulationDepth = 90;
                modulationRatioLock = false;
            break
            case "Vibrato":
                modulationType = "fm";
                modulationFrequency = 6;
                modulationDepth = 60;
                modulationRatioLock = false;
            break
            case "Bass":
                modulationType = "am";
                modulationFrequency = 3;
                modulationDepth = 38;            
                modulationRatioLock = true;
            break
            case "Bell":
                modulationType = "fm";
                modulationFrequency = 16;
                modulationDepth = 40;
                modulationRatioLock = true;
            break
            case "Mystery":
                modulationType = "fm";
                modulationFrequency = 5;
                modulationDepth = 34;
                modulationRatioLock = true;
            break
            default: 
        }

            if (modulationType === "fm") {
                this.modulator.disconnect(this.synth.volume);
                setTimeout(() => {
                    this.modulator.connect(this.synth.frequency);
                }, 200)
            } else {
                this.modulator.disconnect(this.synth.frequency);
                setTimeout(() => {
                    this.modulator.connect(this.synth.volume);
                }, 200)
            }
        let newModulatorFreq = modulationFrequency;
        if (newModulatorFreq !== ("0.5")) {
            newModulatorFreq = Math.round(newModulatorFreq)
        }
        let relativeModulatorFreq = newModulatorFreq;
        if (modulationRatioLock) {
            relativeModulatorFreq *= this.synth.frequency.value;
        }
        this.modulator.frequency.value = relativeModulatorFreq;

        if (modulationType === "am") {
            // 20 log10 (x) = -20
            // 10^val/20 
            let newModulatorVolume = 20 * Math.log10((modulationDepth / 100) * Math.pow(10, this.synth.volume.value / 20));
            this.modulator.volume.value = newModulatorVolume;
        } else {
            // Map between 0 and 5
            this.modulator.volume.value = 20 * Math.log10((modulationDepth / 100) * 10 * relativeModulatorFreq);
        }

        this.setState({
            modulationType: modulationType, 
            modulationFrequency: modulationFrequency, 
            modulationDepth: modulationDepth, 
            modulationRatioLock: modulationRatioLock,
            modulationPreset: modulationPreset})

    }
    
    handleModulationTypeChange = () =>{
        this.modulator.volume.value = -Infinity;

        if(this.state.modulationType === "am"){
            this.modulator.disconnect(this.synth.volume);
            let newModulatorFreq = this.state.modulationFrequency;
            if (newModulatorFreq !== ("0.5")) {
                newModulatorFreq = Math.round(newModulatorFreq)
            }
            let relativeModulatorFreq = newModulatorFreq;
            if (this.state.modulationRatioLock) {
                relativeModulatorFreq *= this.synth.frequency.value;
            }
            this.modulator.volume.setValueAtTime(20 * Math.log10((this.state.modulationDepth / 100) * 10 * relativeModulatorFreq, Tone.now() + 0.2));
            setTimeout(() => {
                this.modulator.connect(this.synth.frequency);
            }, 200)
        } else {
            this.modulator.disconnect(this.synth.frequency);
            let newModulatorVolume = 20 * Math.log10((this.state.modulationDepth / 100) * Math.pow(10, this.synth.volume.value / 20))
            this.modulator.volume.setValueAtTime(newModulatorVolume, Tone.now() + 0.2);
            setTimeout(()=>{
                this.modulator.connect(this.synth.volume);
            }, 200)
        }
           
        this.setState({modulationType: (this.state.modulationType === "am") ? "fm": "am", modulationPreset: ""});

    }

    handleModulationLockChange = () => {
        let newModulatorFreq = this.state.modulationFrequency;
        if (newModulatorFreq !== ("0.5")) {
            newModulatorFreq = Math.round(newModulatorFreq)
        }
        let relativeModulatorFreq = newModulatorFreq;
        if (!this.state.modulationRatioLock) {
            relativeModulatorFreq *= this.synth.frequency.value;
        }
        this.modulator.frequency.value = relativeModulatorFreq;

        if(this.state.modulationType === "fm"){
            this.modulator.volume.value = 20 * Math.log10((this.state.modulationDepth / 100) * 10 * relativeModulatorFreq);
        }
        this.setState({modulationRatioLock: !this.state.modulationRatioLock, modulationPreset: ""})
    }

    handleModulationChange = (e, modulationChange) =>{
        if(modulationChange === "frequency"){
            let newModulatorFreq = e.target.value;
            if(newModulatorFreq !== ("0.5") ){
                newModulatorFreq = Math.round(newModulatorFreq)
            } 
            let relativeModulatorFreq = newModulatorFreq;
            if(this.state.modulationRatioLock){
                relativeModulatorFreq *= this.synth.frequency.value;
            }
            this.modulator.frequency.value = relativeModulatorFreq;
            this.setState({modulationFrequency: newModulatorFreq })
            if(this.state.modulationType === "fm"){
                this.modulator.volume.value = 20 * Math.log10((this.state.modulationDepth / 100) * 10 * relativeModulatorFreq);
            }
            
        } else {
            // Depth change
            if(this.state.modulationType === "am"){
                // 20 log10 (x) = -20
                // 10^val/20 
                let newModulatorVolume = 20 * Math.log10((e.target.value / 100) * Math.pow(10, this.synth.volume.value / 20));
                this.modulator.volume.value = newModulatorVolume; 
            } else {
                // Map between 0 and 5
                this.modulator.volume.value = 20 * Math.log10((e.target.value / 100) * 10 * this.modulator.frequency.value);
            }
            this.setState({modulationDepth: e.target.value })

        }
        this.setState({modulationPreset: ""})
    }

    render(){
        return (
            <>
                <div className="synthesis-content-title">Modulation</div>
                <div className="synthesis-content-text">
                    Modulation is just a fancy word for change. For example, moving your mouse back and forth across the screen could be called mouse position modulation.
                    In synthesis, two important use cases for modulation are <b className="modulation-amplitude-text">Amplitude Modulation</b> and 
                    <b className="modulation-frequency-text"> Frequency Modulation</b>, which is the same process your radio uses to divide stations.
                    <br/><br/>
                    Modulation requires two signals: a carrier, the normal, unmodulated sound, and a modulator, the signal that changes some parameter of the carrier over time.
                    The carrier itself is usually a sine wave. In the mouse position modulation example, the carrier would be the mouse picture on the screen, and the modulator 
                    would be your hand which acts as a wave that changes the x and y coordinates of the mouse picture on the screen. 
                    In modulation, there are two main parameters: modulation frequency and modulation depth. 
                    Modulation frequency is simply the frequency of the moduating signal and changing this frequency changes how quickly the parameter being modulated moves.
                    Modulation depth controls the volume ratio of the modulator to the carrier and thus how much modulation is present in the final output. 
                    <br/><br/>
                    In amplitude modulation, the volume of the carrier is changed. At a small frequency (5 hz) this produces a <b>tremolo</b> effect. 
                    At a higher frequency, the modulation becomes so quick that it starts to produces <b>sidebands</b> of other frequencies, which depend on the
                    ratio between the modulator frequency and the carrier frequency.
                    In frequency modulation, the frequency of the carrier is changed. At a small frequency this produces a <b>vibrato</b> effect. 
                    At a higher frequency, the modulation produces a ton of sidebands, again based on the modulation frequency/carrier frequency ratio
                    and can be used as a simple replacement to additive synthesis!                    
                </div>
                <DemoContainer 
                    onXYPointerDown={this.onXYPointerDown} 
                    onXYPointerMove={this.onXYPointerMove} 
                    onXYPointerUp={this.onXYPointerUp}
                    handleSustainToggle={this.handleSustainToggle}
                    signal={this.synth}
                    trigger={false}
                    ref={this.demoContainRef}
                >
                    <ModulationDemo
                        modulationType = {this.state.modulationType}
                        modulationFrequency={this.state.modulationFrequency}
                        modulationDepth={this.state.modulationDepth}
                        modulationRatioLock={this.state.modulationRatioLock}
                        modulationPreset={this.state.modulationPreset}
                        handleModulationTypeChange = {this.handleModulationTypeChange}
                        handleModulationLockChange = {this.handleModulationLockChange}
                        handleModulationChange = {this.handleModulationChange}
                        handleModulationPresetChange = {this.handleModulationPresetChange}
                    />
                </DemoContainer>            
            </>
        )
    }

}

export default Modulation;