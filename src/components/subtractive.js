import React from 'react';
import * as Tone from "tone"
import { convertToLog, arrMax, arrSum, getFreq, getGain } from "../utils";
import DemoContainer from './demoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import "../styles/subtractive.css"
import { max } from 'd3';

const filterPresets = ["Low-Pass", "High-Pass", "Band-Pass", "All-Pass", "Comb", "Mystery"]
const filterDBs = ["30 dB", "20 dB", "10 dB", "0 dB", "-10 dB", "-20 dB", "-30 dB"]
const filterFreqs = ["50 Hz", "143 Hz", "385 Hz", "1 kHz", "2.7 kHz", "7.4 kHz"]
const wavePresets = ["Sawtooth", "Square", "Triangle", "Noise"]
function SubtractiveDemo(props){
    let midpoint = props.filterHeight/2;
    let filterFadePoint;
    let filterFadePoint1;
    let filterFadePoint2;
    let filterPath;
    let filterDashedPath;
    // let filterDashedPath1;
    // let filterDashedPath2;
    let filterDarkPolygon;
    let filterDarkPolygon1;
    let filterDarkPolygon2;
    let handlePosition = props.filterCutoffPosition;
    let handlePosition2;
    switch(props.filterPreset){
        case "All-Pass": 
            filterPath = `M 0 ${midpoint} H ${props.filterWidth}`
            filterDashedPath = `M 0 0`;
            filterDarkPolygon = `0 0`;
            // filterDarkPolygon = `${props.filterCutoffPosition}, ${midpoint}, ${filterFadePoint}, ${props.filterHeight}, ${props.filterWidth}, ${props.filterHeight}, ${props.filterWidth}, ${midpoint}`
            break;
        case "Low-Pass":
            filterFadePoint = props.filterCutoffPosition + 0.3 * props.filterWidth;
            filterPath = `M 0 ${midpoint} L ${props.filterCutoffPosition} ${midpoint} L ${filterFadePoint} ${props.filterHeight}`
            filterDashedPath = `M ${props.filterCutoffPosition} ${midpoint} H ${props.filterWidth}`
            filterDarkPolygon = `${props.filterCutoffPosition}, ${midpoint}, ${filterFadePoint}, ${props.filterHeight}, ${props.filterWidth}, ${props.filterHeight}, ${props.filterWidth}, ${midpoint}`
            break;
        case "High-Pass":
            filterFadePoint = props.filterCutoffPosition - 0.3 * props.filterWidth;
            filterPath = `M ${props.filterWidth} ${midpoint} L ${props.filterCutoffPosition} ${midpoint} L ${filterFadePoint} ${props.filterHeight}`
            filterDashedPath = `M 0 ${midpoint} H ${props.filterWidth}`
            filterDarkPolygon = `0, ${midpoint}, ${props.filterCutoffPosition}, ${midpoint}, ${filterFadePoint}, ${props.filterHeight}, 0, ${props.filterHeight}`
            break
        case "Band-Pass":
            filterFadePoint1 = props.filterCutoffPosition1 - 0.3 * props.filterWidth;
            filterFadePoint2 = props.filterCutoffPosition2 + 0.3 * props.filterWidth;
            filterPath = `M ${filterFadePoint1}, ${props.filterHeight} L ${props.filterCutoffPosition1} ${midpoint} L ${props.filterCutoffPosition2} ${midpoint} L ${filterFadePoint2} ${props.filterHeight}`
            filterDashedPath = `M 0 ${midpoint} H ${props.filterWidth}`
            // filterDashedPath2 = `M 0 ${midpoint} H ${props.filterWidth}`
            filterDarkPolygon = `0, ${midpoint}, ${props.filterCutoffPosition1}, ${midpoint}, ${filterFadePoint1}, ${props.filterHeight}, 0, ${props.filterHeight}`
            filterDarkPolygon2 = `${props.filterCutoffPosition2}, ${midpoint}, ${filterFadePoint2}, ${props.filterHeight}, ${props.filterWidth}, ${props.filterHeight}, ${props.filterWidth}, ${midpoint}`
            handlePosition = props.filterCutoffPosition1;
            handlePosition2 = props.filterCutoffPosition2;

            // filterDarkPolygon2 = `0, ${midpoint}, ${props.filterCutoffPosition}, ${midpoint}, ${filterFadePoint}, ${props.filterHeight}, 0, ${props.filterHeight}`
            break                
        default:
            filterPath = "";
    }

    let leftCaretBackground = wavePresets.indexOf(props.waveSelection) ? "rgb(9, 160, 206)" : "rgb(97, 97, 97";
    let rightCaretBackground = ((wavePresets.indexOf(props.waveSelection)) < (wavePresets.length - 1)) ? "rgb(9, 160, 206)" : "rgb(97, 97, 97)";

    return (
        <div className="subtractive-demo-container">
            <div className="subtractive-sound-selection-container">
                <div className="subtractive-sound-selection-input-container">
                    <div className="wave-selection-title">Wave</div>
                    <div className="wave-selection-input">
                        <FontAwesomeIcon className="wave-selection-input-left" color={leftCaretBackground} icon={faCaretLeft} onClick={e=>{props.handleWaveChange(wavePresets.indexOf(props.waveSelection) - 1)}}/>
                        {props.waveSelection}
                        <FontAwesomeIcon className="wave-selection-input-right" color={rightCaretBackground} icon={faCaretRight} onClick={e=>{props.handleWaveChange(wavePresets.indexOf(props.waveSelection) + 1)}}/>
                    </div>
                </div>
                <div className="subtractive-presets-container">
                    <div className="harmonic-preset-title">Filter Presets</div>
                    <div className="harmonic-presets-list">
                        {filterPresets.map(preset=>{
                            let presetBorder = "2px solid transparent";
                            if(props.filterPreset === preset){
                                presetBorder = "2px solid rgb(9, 160, 206)";
                            }
                          return (
                            <div
                                className="harmonic-preset" 
                                key={preset} 
                                onClick={()=>props.handleFilterPresetChange(preset)} 
                                style={{"border": presetBorder, "padding": "1px 3px"}}
                            >
                                {preset}
                            </div>
                          )
                        })}
                    </div>
                </div>
            </div>
            <div className="subtractive-filter-container">
                <svg className="subtractive-filter"
                    onPointerDown={props.onFilterPointerDown} 
                    onPointerMove={props.onFilterPointerMove} 
                    onPointerUp={props.onFilterPointerUp} 
                    ref={props.filterRef}>
                    <path d={filterPath} fill="transparent" stroke="rgb(238, 238, 238)" strokeWidth={3}></path>
                    <path d={filterDashedPath} fill="transparent" stroke="rgb(238, 238, 238)" strokeWidth={1} strokeDasharray="5,5"></path>
                    <polygon points={filterDarkPolygon} fill="rgb(9, 160, 206, 0.4)" stroke="transparent"/>
                    {props.filterPreset === "Band-Pass" && <polygon points={filterDarkPolygon2} fill="rgb(9, 160, 206, 0.4)" stroke="transparent"/>}
                    <circle cx={handlePosition} cy={midpoint} r="7" fill={props.filterCursorFill} stroke="rgb(9, 160, 206)" strokeWidth={3}/>
                    {props.filterPreset === "Band-Pass" && <circle cx={handlePosition2} cy={midpoint} r="7" fill={props.filterCursorFill} stroke="rgb(9, 160, 206)" strokeWidth={3}/>}

                    {filterDBs.map((db, index)=>{
                        let percentage = (1 / (filterDBs.length + 1)) * (index + 1)
                        let offset = 3;
                        return (
                            <text x="5" y={props.filterHeight * percentage - offset} fontFamily="sans-serif" fontSize="10px" fill="rgba(238, 238, 238, 0.5)" key={db}>{db}</text>
                        )

                    })}
                    {filterFreqs.map((freq, index)=>{
                        let percentage = (1 / (filterFreqs.length + 1)) * (index + 1)
                        let path = `M ${props.filterWidth * percentage} 0 V ${props.filterHeight}`
                        let offset = 3;
                        return (
                            <React.Fragment key={freq}>
                                <text x={props.filterWidth * percentage + offset} y="10" fontFamily="sans-serif" fontSize="10px" fill="rgba(238, 238, 238, 0.5)">{freq}</text>
                                <path d={path} stroke="rgba(238, 238, 238, 0.5)"/>
                            </React.Fragment>
                        )

                    })}                    

                </svg>
            </div>
        </div>
    )
}

class Subtractive extends React.Component {
    constructor(){
        super();
        this.state = {
            waveSelection: "Sawtooth",
            filterPreset: "Low-Pass",
            filterWidth: 1,
            filterCursorFill: "none",
            filterCutoffPosition: 0
        }
        this.filterRef = React.createRef();
        this.demoContainRef = React.createRef();
    }

    componentDidMount(){
        this.synth = new Tone.Synth();
        let rect = this.filterRef.current.getBoundingClientRect();
        this.setState({filterWidth: rect.width, filterCutoffPosition: rect.width * (4/7)});

        this.synth.oscillator.type = "sawtooth"
        this.synth.volume.value = 0;
        this.noise = false;


        this.filter = new Tone.Filter(1000, "lowpass").toDestination();
        this.synth.connect(this.filter);

    }   

    componentWillUnmount() {
        if (this.noise) {
            this.synth.stop();
        } else{
            this.synth.triggerRelease();
        }
    }

    onXYPointerDown = (x, y) =>{
        let freq = getFreq((1 - y), 50, 8000);
        let volume = getGain((1 - x), 0, -30);
        if(this.noise){ 
            this.synth.start();
            this.noiseFreq = freq;
        } else {
            this.synth.triggerAttack(freq);
        }
        this.synth.volume.value = volume;
        this.playing = true;
    }

    onXYPointerMove = (x, y) =>{
        if (this.playing) {
            let freq = getFreq((1 - y), 50, 8000);
            let volume = getGain((1 - x), 0, -30);
            if(this.noise){
                this.noiseFreq = freq;
            } else{
                this.synth.frequency.value = freq;
            }
            this.synth.volume.value = volume;
        }
    }

    onXYPointerUp = (x, y) =>{
        if (!this.sustain) {
            if(this.noise){
                this.synth.stop();
            } else {
                this.synth.triggerRelease();
            }
            this.playing = false;
        } else {
            
        }
    }

    handleSustainToggle = () => {
        this.sustain = !this.sustain;
        if (this.noise) {
            this.synth.stop();
        } else {
            this.synth.triggerRelease();
            // this.sustainFreq = this.synth.frequency.value;
        }
        this.playing = false;
        this.sustainVol = this.synth.volume.value;
    }

    handleWaveChange = newWave => {
        if(newWave < wavePresets.length && newWave > -1){
            let newSelection = wavePresets[newWave];
            this.setState({waveSelection: newSelection});
            
            let prevFreq;
            if(this.noise){
                prevFreq = this.noiseFreq;
                this.synth.stop();
            } else {
                prevFreq = this.synth.frequency.value;
                this.synth.triggerRelease();
            }
            
            let prevVolume = this.synth.volume.value;
            this.synth.dispose();
            if (newSelection === "Noise"){
                this.synth = new Tone.Noise();
                this.noise = true;
                this.noiseFreq = prevFreq;

            }
            else {    
                this.synth = new Tone.Synth();
                this.synth.oscillator.type = newSelection.toLowerCase();
                this.noise = false;
            }
            this.synth.connect(this.filter);
            if(this.sustain){
                if(this.noise){
                    this.synth.start();
                } else {
                    this.synth.triggerAttack(prevFreq)
                }
                this.synth.volume.value = 0;
                this.synth.volume.rampTo(prevVolume, 4);
            }
            this.demoContainRef.current.resetSignal();
        }
    }

    handleFilterPresetChange = filterPreset =>{
        let startingCutoff;
        let startingCutoff1;
        let startingCutoff2;
        let filterType;
        let filterFreq;
        switch(filterPreset){
            case "All-Pass": 
                startingCutoff = this.state.filterWidth + 200;
                filterType = "allpass"
                break
            case "Low-Pass": 
                startingCutoff = this.state.filterWidth * (4/7);
                filterFreq = 1000;
                filterType = "lowpass"
                break
            case "High-Pass": 
                startingCutoff = this.state.filterWidth * (4/7);
                filterType = "highpass"
                filterFreq = 1000;
                break
            case "Band-Pass":
                startingCutoff1 = this.state.filterWidth * (2/7)
                startingCutoff2 = this.state.filterWidth * (5/7)
                filterType = "bandpass"
                let filterFreq1 = 143;
                let filterFreq2 = 2700;
                filterFreq = (filterFreq1 + filterFreq2)/2;

                break
            default: startingCutoff = 0;
        }
        this.filter.type = filterType;
        this.filter.frequency.rampTo(filterFreq, 0.1);
        this.setState({filterPreset: filterPreset, filterCutoffPosition: startingCutoff, filterCutoffPosition1: startingCutoff1, filterCutoffPosition2: startingCutoff2})
    }


    onFilterPointerDown = (e) => {
        e.preventDefault();
        let rect = this.filterRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        // let y = e.clientY - rect.top; //y position within the element.
        let filterFreq = getFreq((x / rect.width), 20, 20000);
        this.setState({filterCutoffPosition: x, filterCursorFill: "rgb(9, 160, 206)"}); 
        this.filter.frequency.rampTo(filterFreq, 0.1);
        // this.filter.frequency = filterFreq
        this.filterPointerDown = true;
        document.addEventListener("pointerup", this.onPointerUp)

    }

    onFilterPointerMove = (e) => {
        e.preventDefault();
        if(this.filterPointerDown){
            let rect = this.filterRef.current.getBoundingClientRect();
            let x = e.clientX - rect.left; //x position within the element.
            let filterFreq = getFreq((x/rect.width), 20, 20000);
            this.filter.frequency.rampTo(filterFreq, 0.1);
            this.setState({filterCutoffPosition: x});
        }
    }

    onFilterPointerUp = (e) => {
        e.preventDefault();
        this.filterPointerDown = false;
        this.setState({filterCursorFill: "none"});
        document.removeEventListener("pointerup", this.onFilterPointerUp)

    }




    render(){
        
        
        return (
            <>
                <div className="synthesis-content-title">Subtractive</div>
                <div className="synthesis-content-text">
                Subtractive synthesis is a popular option to create rich, warm tones, pioneered in analog synths in the 1960s.
                Using subtractive synthesis is like being a sculptor: a harmonically rich sound (like a sawtooth wave or even noise) is cut away to find to beautiful sound underneath. 
                This process is called <b>filtering</b>, and it is a fundamental technique is working with sound.
                <br/><br/>
                There are three basic types of filters: <b>low-pass</b>, <b>high-pass</b>, and <b>band-pass</b>. Their names describe their purpose. 
                The low-pass filter removes high frequency content, while allowing low frequencies to pass through,  up to a defined cutoff point. 
                The high-pass filter removes low frequency content, while allowing high frequencies to pass though, again up to defined cutoff point. 
                The band-pass filter is a combination of the two, allowing a range or band or frequencies to pass through, with low and high cutoff points. 
                Try moving the cutoff and changing the filters below to hear how they affect the sound. 

                </div>
                <DemoContainer 
                    onXYPointerDown={this.onXYPointerDown} 
                    onXYPointerMove={this.onXYPointerMove} 
                    onXYPointerUp={this.onXYPointerUp}
                    handleSustainToggle={this.handleSustainToggle}
                    signal={this.filter}
                    ref={this.demoContainRef}
                >
                    <SubtractiveDemo
                    waveSelection={this.state.waveSelection}
                    filterRef={this.filterRef}
                    filterPreset={this.state.filterPreset}
                    filterWidth={this.state.filterWidth}
                    filterHeight={150}
                    filterCutoffPosition={this.state.filterCutoffPosition}
                    filterCutoffPosition1={this.state.filterCutoffPosition1}
                    filterCutoffPosition2={this.state.filterCutoffPosition2}
                    filterCursorFill={this.state.filterCursorFill}
                    onFilterPointerDown={this.onFilterPointerDown}
                    onFilterPointerMove={this.onFilterPointerMove}
                    onFilterPointerUp={this.onFilterPointerUp}
                    handleWaveChange={this.handleWaveChange}
                    handleFilterPresetChange={this.handleFilterPresetChange}

                    />
                </DemoContainer>            
            </>
        )
    }

}

export default Subtractive;