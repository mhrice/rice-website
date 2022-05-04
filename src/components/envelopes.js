import React from 'react';
import * as Tone from "tone"
import { convertToLog, getFreq, getGain } from "../utils";
import DemoContainer from './demoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretLeft, faCaretRight,  } from '@fortawesome/free-solid-svg-icons';

import "../styles/envelopes.css"

const envelopePresets = ["Default", "Pluck", "Pad", "Fortepiano", "Swell Up/Down"]
const wavePresets = ["Sine", "Square", "Sawtooth", "Triangle"]
const TOP_ENVELOPE_POSITION = 15;
let dotMode = "";

function EnvelopesDemo(props) {
    let sustainEnd = 0.8 * props.envelopeWidth;
    let leftCaretBackground = wavePresets.indexOf(props.waveSelection) ? "rgb(9, 160, 206)" : "rgb(97, 97, 97";
    let rightCaretBackground = ((wavePresets.indexOf(props.waveSelection)) < (wavePresets.length - 1)) ? "rgb(9, 160, 206)" : "rgb(97, 97, 97)";    

    let envelopeAttributes = {
        attack: {
            path: `M 0 ${props.envelopeHeight} L ${props.envelopePositions.attack} ${TOP_ENVELOPE_POSITION}`,
            zoneDivider: `M ${props.envelopePositions.attack} 0 V ${props.envelopeHeight}`,
            cursorY: TOP_ENVELOPE_POSITION,
            rectStart: 0,
            rectWidth: props.envelopePositions.attack,
            stroke: "rgb(147, 33, 76)"
        },
        decay: {
            path: `M ${props.envelopePositions.attack} ${TOP_ENVELOPE_POSITION} L ${props.envelopePositions.decay} ${props.envelopePositions.sustain}`,
            zoneDivider: `M ${props.envelopePositions.decay} 0 V ${props.envelopeHeight}`,
            cursorY: props.envelopePositions.sustain,
            rectStart: props.envelopePositions.attack,
            rectWidth: props.envelopePositions.decay - props.envelopePositions.attack,
            stroke: "rgb(109,234,166)"
        },
        sustain: {
            path: `M ${props.envelopePositions.decay} ${props.envelopePositions.sustain} L ${sustainEnd} ${props.envelopePositions.sustain}`,
            zoneDivider: `M ${sustainEnd} 0 V ${props.envelopeHeight}`,
            cursorY: props.envelopePositions.sustain,
            rectStart: props.envelopePositions.decay,
            rectWidth: sustainEnd - props.envelopePositions.decay,
            stroke: "rgb(242, 187 ,60)"
        },
        release: {
            path: `M ${sustainEnd} ${props.envelopePositions.sustain} L ${props.envelopePositions.release} ${props.envelopeHeight - 5}`,
            zoneDivider: "",
            cursorY: props.envelopeHeight - 5,
            rectStart: sustainEnd,
            rectWidth: props.envelopeWidth - sustainEnd,
            stroke: "rgb(132,61,183)"
        }
    }

    return (
        <div className="envelopes-demo-container">
            <div className="envelopes-sound-selection-container">
                <div className="envelopes-sound-selection-input-container">
                    <div className="wave-selection-title">Wave</div>
                    <div className="wave-selection-input">
                        <FontAwesomeIcon className="wave-selection-input-left" color={leftCaretBackground} icon={faCaretLeft} onClick={e=>{props.handleWaveChange(wavePresets.indexOf(props.waveSelection) - 1)}}/>
                        {props.waveSelection}
                        <FontAwesomeIcon className="wave-selection-input-right" color={rightCaretBackground} icon={faCaretRight} onClick={e=>{props.handleWaveChange(wavePresets.indexOf(props.waveSelection) + 1)}}/>
                    </div>
                </div>
                <div className="envelopes-presets-container">
                    <div className="harmonic-preset-title">Envelope Presets</div>
                    <div className="harmonic-presets-list">
                        {envelopePresets.map(preset=>{
                            let presetBorder = "2px solid transparent";
                            if(props.envelopePreset === preset){
                                presetBorder = "2px solid rgb(9, 160, 206)";
                            }
                          return (
                            <div
                                className="harmonic-preset" 
                                key={preset} 
                                onClick={()=>props.handleEnvelopePresetChange(preset)} 
                                style={{"border": presetBorder, "padding": "1px 3px"}}
                            >
                                {preset}
                            </div>
                          )
                        })}
                    </div>
                </div>
            </div>
            <div className="envelopes-graph-container">
                <svg className="envelopes-graph"
                    onPointerDown={props.onEnvelopePointerDown} 
                    onPointerMove={props.onEnvelopePointerMove} 
                    onPointerUp={props.onEnvelopePointerUp} 
                    ref={props.envelopeRef}>
                        {Object.keys(envelopeAttributes).map((label)=>{
                            let cursorPosition = props.envelopePositions[label];
                            if(label==="sustain"){
                                cursorPosition = (props.envelopePositions.decay + sustainEnd) / 2;
                            }
                            return (
                                <React.Fragment key={label}>
                                    <path d={envelopeAttributes[label].path} fill="transparent" stroke={envelopeAttributes[label].stroke} strokeWidth={5}></path>
                                    <path d={envelopeAttributes[label].zoneDivider} stroke="rgba(238, 238, 238, 0.75)" strokeDasharray="5,5"/>
                                    <rect x={envelopeAttributes[label].rectStart} y="0" width={envelopeAttributes[label].rectWidth} height={props.envelopeHeight} fill={envelopeAttributes[label].stroke} opacity="0.2" stroke="transparent"/>
                                    <circle cx={cursorPosition} cy={envelopeAttributes[label].cursorY} r="7" fill={props.envelopeCursorFills[label]} stroke="rgb(9, 160, 206)" strokeWidth={3}/>

                                </React.Fragment>
                            )

                        })}
                    <path d={`M 0 ${TOP_ENVELOPE_POSITION} H ${props.envelopeWidth}`} stroke="rgba(238, 238, 238, 0.75)"/>
                    <circle cx = {props.dotPosition.x} cy={props.dotPosition.y} r="6" fill="#EEEEEE" stroke="#616161" strokeWidth={2}/>
                </svg>          

            </div>
            <div className="envelope-zone-container">      
                {Object.keys(envelopeAttributes).map(label=>{
                    let lineWidth = envelopeAttributes[label].rectWidth - 10;
                    if(label === "release"){
                        lineWidth = props.envelopePositions.release - sustainEnd - 10;
                    }

                    let adjustedSustainPosition = props.envelopeHeight - props.envelopePositions.sustain;
                    return (
                        <div className="graph-label-container" style={{"left": envelopeAttributes[label].rectStart, "width": envelopeAttributes[label].rectWidth}} key={label}>
                            {label !== "sustain" ? 
                                <React.Fragment key={label}>
                                    <svg width={envelopeAttributes[label].rectWidth + 10} height={10}>
                                        <defs>  
                                            <marker id={`start-arrow-${label}`} markerWidth="10" markerHeight="7" 
                                            refX="2" refY="3.2" orient="auto">
                                                <polygon points="10 0, 10 7, 0 3.5" fill="rgb(41, 48, 56)" />
                                            </marker>
                                            <marker id={`end-arrow-${label}`} markerWidth="10" markerHeight="7" 
                                            refX="2" refY="3.2" orient="auto">
                                                <polygon points="0 0, 10 3.5, 0 7" fill="rgb(41, 48, 56)" />
                                            </marker>                                    
                                        </defs>
                                            <line x1="10" y1="5" x2={lineWidth} y2="5" stroke="rgb(41, 48, 56)" strokeWidth="1" markerStart={`url(#start-arrow-${label})`} markerEnd={`url(#end-arrow-${label})`}/>
                                    </svg>       
                                    <div className="graph-label"> {label.charAt(0).toUpperCase() + label.slice(1)}</div>
                                </React.Fragment>

                            :
                                <>
                                    <svg width={10} height={Math.max(adjustedSustainPosition - 10, 1)} style={{position: "absolute", "top": -(adjustedSustainPosition - 10), "left": "70px"}}>
                                        <defs>  
                                            <marker id={`start-arrow-${label}`} markerWidth="10" markerHeight="7" 
                                            refX="2" refY="3.2" orient="auto">
                                                <polygon points="10 0, 10 7, 0 3.5" fill="rgb(41, 48, 56)" />
                                            </marker>
                                            <marker id={`end-arrow-${label}`} markerWidth="10" markerHeight="7" 
                                            refX="2" refY="3.2" orient="auto">
                                                <polygon points="0 0, 10 3.5, 0 7" fill="rgb(41, 48, 56)" />
                                            </marker>                                    
                                        </defs>
                                            <line x1="5" y1="0" x2="5" y2={Math.max(adjustedSustainPosition - 20, 1)} stroke="rgb(41, 48, 56)" strokeWidth="1" markerStart={`url(#start-arrow-${label})`} markerEnd={`url(#end-arrow-${label})`}/>
                                    </svg>  
                                    <div className="graph-label sustain-graph-label" style={{"position": "absolute", "top": -(adjustedSustainPosition)/2 - 10, "left": "10px"}}> {label.charAt(0).toUpperCase() + label.slice(1)}</div>
                                </>
                            }                              
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

class Envelopes extends React.Component {
    constructor(){
        super();
        this.state = {
            waveSelection: "Sawtooth",
            envelopePreset: "Default",
            envelopeWidth: 1,
            envelopeheight: 1,
            envelopeCursorFills: {attack: "transparent", decay: "transparent", sustain: "transparent", release: "transparent"},
            envelopePositions: {attack: 0, decay: 0, sustain: 0, release: 0},
            dotPosition: {x: 5, y: 6},
            dotMode: "attack"
        }
        this.envelopeRef = React.createRef();
        this.demoContainRef = React.createRef();
    }

    componentDidMount(){
        this.synth = new Tone.Synth();
        let rect = this.envelopeRef.current.getBoundingClientRect();
        let startingAttackPosition = 0.2 * rect.width;
        let startingDecayPosition = 0.4 * rect.width;
        let startingSustainLevel = 0.5  * rect.height;
        let startingReleasePosition = 0.9 * rect.width;

        this.setState({
            envelopeWidth: rect.width,
            envelopeHeight: rect.height,
            envelopePositions: {
                attack: startingAttackPosition, 
                decay: startingDecayPosition, 
                sustain: startingSustainLevel, 
                release: startingReleasePosition
                },
            dotPosition: {
                x: 5, 
                y: rect.height - 6
            }
        });
        console.log("YE")
        Tone.Transport.start();
        this.synth.toDestination();
        this.synth.oscillator.type = "sawtooth";
        this.synth.volume.value = 0;
        this.synth.envelope.attack = 0.2;
        this.synth.envelope.decay = 0.2;
        this.synth.envelope.sustain = 0.5;
        this.synth.envelope.release = 1;
        this.activeEnvelope = "";

    }   

    componentWillUnmount() {
        this.synth.triggerRelease();
    }

    onXYPointerDown = (x, y) =>{
        let freq = getFreq((1 - y), 50, 8000);
        let volume = getGain((1 - x), 0, -30);
        this.synth.volume.value = volume;
        this.synth.triggerAttack(freq);
        this.playing = true;
        Tone.Transport.clear(this.dotId);
        dotMode = "attack";
        this.animateDot(true);
        
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
            Tone.Transport.clear(this.dotId);
            dotMode = "release";
            this.animateDot(false);        
        }
    }

    handleSustainToggle = () => {
        this.sustain = !this.sustain;
        this.synth.triggerRelease();
        this.playing = false;
        this.sustainVol = this.synth.volume.value;
    }

    handleWaveChange = newWave => {
        if(newWave < wavePresets.length && newWave > -1){
            let newSelection = wavePresets[newWave];
            this.setState({waveSelection: newSelection});
            this.synth.oscillator.type = newSelection.toLowerCase();
        }
    }

    handleEnvelopePresetChange = envelopePreset =>{
        let attack, decay, sustain, release;
        switch(envelopePreset){
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
        this.synth.envelope.attack = attack;
        this.synth.envelope.decay = decay;
        this.synth.envelope.sustain = sustain;
        this.synth.envelope.release = convertToLog(release, 0.01, 1, 0.1, 10);
        let sustainEnd = 0.8 * this.state.envelopeWidth;

        let newEnvelopePositions = {
            attack: attack * this.state.envelopeWidth,
            decay: (decay + attack) * this.state.envelopeWidth,
            sustain: (1 - sustain) * this.state.envelopeHeight,
            release: (this.state.envelopeWidth - sustainEnd) * release + sustainEnd
        }
        this.setState({envelopePositions: newEnvelopePositions, envelopePreset: envelopePreset, dotPosition: {x: 5, y: this.state.envelopeHeight - 6}});
    }


    onEnvelopePointerDown = (e) => {
        e.preventDefault();
        let rect = this.envelopeRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top; //y position within the element.
        // let envelopeFreq = getFreq((x / rect.width), 20, 20000);
        let sustainEnd = 0.8 * rect.width;
        let activeEnvelope = "";
        
        if (this.checkInRange(x, y, this.state.envelopePositions.attack, TOP_ENVELOPE_POSITION)) {
            activeEnvelope = "attack";
        } else if (this.checkInRange(x, y, this.state.envelopePositions.decay, this.state.envelopePositions.sustain)) {
            activeEnvelope = "decay";

        } else if (this.checkInRange(x, y, (this.state.envelopePositions.decay + sustainEnd) / 2, this.state.envelopePositions.sustain)) {
            activeEnvelope = "sustain";
        } else if (this.checkInRange(x, y, this.state.envelopePositions.release, rect.height - 5)) {
            activeEnvelope = "release";
        }

        this.setState(prevState=>({
            envelopeCursorFills: {
                ...prevState.envelopeCursorFills,
                [activeEnvelope]: "rgb(9, 160, 206)"
            },
            envelopePreset: "None"
        })); 

        document.addEventListener("pointerup", this.onEnvelopePointerUp)
        // document.addEventListener("pointerout", this.onEnvelopePointerUp)


        // this.envelope.frequency = envelopeFreq
        this.activeEnvelope = activeEnvelope;
        this.envelopePointerDown = true;
        
    }

    onEnvelopePointerMove = (e) => {
        e.preventDefault();
        if(this.envelopePointerDown && this.activeEnvelope !== ""){
            let rect = this.envelopeRef.current.getBoundingClientRect();
            let x = e.clientX - rect.left; //x position within the element.
            let y = e.clientY - rect.top; //y position within the element.
            let newPosition = (this.activeEnvelope !== "sustain") ? x : y; // Sustain is a level
            if(!this.validateEnvelopeMove(newPosition)){
                // Constrain move positions
                newPosition = this.state.envelopePositions[this.activeEnvelope];
            }
            
            let sustainEnd = 0.8 * rect.width;
            if(this.activeEnvelope === "attack"){
                let newAttack = (1 - (sustainEnd - newPosition) / sustainEnd);
                let decayRange = sustainEnd - newPosition;
                let newDecay = (this.state.envelopePositions.decay - newPosition) / decayRange; //decay
                this.synth.envelope.attack = Math.max(newAttack, 0.01);
                this.synth.envelope.decay = Math.max(newDecay, 0.01);

            }
            else if(this.activeEnvelope === "decay"){
                let newAttack = (1 - (sustainEnd - this.state.envelopePositions.attack) / sustainEnd);
                let decayRange = sustainEnd - this.state.envelopePositions.attack;
                let newDecay = (newPosition - this.state.envelopePositions.attack) / decayRange; //decay
                this.synth.envelope.attack = Math.max(newAttack, 0.01);
                this.synth.envelope.decay = Math.max(newDecay, 0.01);

            }
            else if(this.activeEnvelope === "sustain"){
                this.synth.envelope.sustain = Math.max(1.1 - (newPosition / rect.height), 0);
            }
            else {
                let releaseRange = this.state.envelopeWidth - sustainEnd;
                let newRelease = Math.max(0, (newPosition - sustainEnd) / releaseRange);
                this.synth.envelope.release = convertToLog(newRelease, 0.01, 1, 0.1, 10);;
            }


            this.setState(prevState => ({
                envelopePositions: {
                    ...prevState.envelopePositions,
                    [this.activeEnvelope]: newPosition
                }
            }));
        }
    }

    onEnvelopePointerUp = (e) => {
        e.preventDefault();
        this.envelopePointerDown = false;
        this.setState({
            envelopeCursorFills: {
                attack: "transparent",
                decay: "transparent",
                sustain: "transparent",
                release: "transparent"
            }
        })
        document.removeEventListener("pointerup", this.onEnvelopePointerUp)
    }


    checkInRange(x, y, xPositionToCheck, yPositionToCheck){
        const radius = 15; // Hit box radius of 15
        let lowXCheck = xPositionToCheck - radius;
        let highXCheck = xPositionToCheck + radius;
        let lowYCheck = yPositionToCheck - radius;
        let highYCheck = yPositionToCheck + radius;
        if(x > lowXCheck && x < highXCheck && y > lowYCheck && y < highYCheck ){
            return true;
        }
        return false;
    }

    validateEnvelopeMove(newPosition){
        let sustainEnd = 0.8 * this.state.envelopeWidth;
        if ((this.activeEnvelope === "attack" && newPosition >= this.state.envelopePositions.decay) || 
           (this.activeEnvelope === "decay" && (newPosition <= this.state.envelopePositions.attack || newPosition >= sustainEnd)) ||
           (this.activeEnvelope === "sustain" && newPosition < TOP_ENVELOPE_POSITION) ||
           (this.activeEnvelope === "release" && newPosition <= sustainEnd)) {
            return false;
        }
        return true;

    }

    animateDot = attackOrRelease => {
        let startingY;
        let startingX;
        if(attackOrRelease){
            startingX = 5;
            startingY = this.state.envelopeHeight - 6;
        } else {
            startingX = 0.8 * this.state.envelopeWidth;
            startingY = this.state.envelopePositions.sustain;
        }
        let startingTime = Tone.now();
        this.dotId = Tone.Transport.scheduleRepeat(time => {
            this.performAnimation(startingX, startingY, time - startingTime);
        }, 0.02);
    }

    performAnimation = (startingX, startingY, time) => {
        let newX, newY;
        let newMode = this.state.dotMode;
        let xDistance, yDistance, xRate, yRate;
        switch (dotMode) {
            case "attack":
                xDistance = this.state.envelopePositions.attack - startingX;
                yDistance = TOP_ENVELOPE_POSITION - startingY;
                xRate = xDistance / (this.synth.envelope.attack);
                yRate = yDistance / (this.synth.envelope.attack);
                newX = (xRate * (time)) + startingX;
                newY = (yRate * (time)) + startingY;

                if (newX > this.state.envelopePositions.attack || newY < TOP_ENVELOPE_POSITION) {
                    newX = this.state.envelopePositions.attack;
                    newY = TOP_ENVELOPE_POSITION;
                    dotMode = "decay";
                }
                break

            case "decay":
                xDistance = this.state.envelopePositions.decay - this.state.envelopePositions.attack;
                yDistance = this.state.envelopePositions.sustain - TOP_ENVELOPE_POSITION;
                xRate = xDistance / (this.synth.envelope.decay);
                yRate = yDistance / (this.synth.envelope.decay);
                newX = (xRate * (time)) + startingX;
                newY = (yRate * (time)) + startingY;
                if (newX > this.state.envelopePositions.decay || newY > this.state.envelopePositions.sustain) {
                    newX = this.state.envelopePositions.decay;
                    newY = this.state.envelopePositions.sustain;
                    dotMode = "sustain";
                    Tone.Transport.clear(this.dotId);
                    Tone.Transport.cancel();

                }
                break


            case "release":                
                xDistance = this.state.envelopePositions.release - startingX;
                yDistance = (this.state.envelopeHeight - 6) - startingY;
                xRate = xDistance / (this.synth.envelope.release);
                yRate = yDistance / (this.synth.envelope.release);
                newX = (xRate * (time)) + startingX;
                newY = (yRate * (time)) + startingY;
                if (newX > this.state.envelopePositions.release || newY > (this.state.envelopeHeight - 6)) {
                    newX = this.state.envelopePositions.release;
                    newY = this.state.envelopeHeight - 6;
                    dotMode = "";
                    Tone.Transport.clear(this.dotId);
                    Tone.Transport.cancel();
                    setTimeout(()=>{
                        this.setState({
                            dotPosition: {
                                x: 5,
                                y: this.state.envelopeHeight - 6
                            }
                        })
                    }, 10)
                }
            break

            default:
                newX = this.state.dotPosition.x;
                newY = this.state.dotPosition.y;
        }
        this.setState({
            dotPosition: {
                x: newX,
                y: newY,
                mode: newMode
            }
        })
    }
    render(){
        
        
        return (
            <>
                <div className="synthesis-content-title">Envelopes</div>
                <div className="synthesis-content-text">
                If you've ever played an instrument before, you know that two qualities that make a big impact on your timbre is your articulation and sustain. 
                One way we can simulate this is with a volume <b>envelope</b>. A volume envelope controls how the sound's volume changes over time, and 
                is a great way to add variety and contrast to your sounds.
                <br/><br/>
                A standard envelope has 4 parameters: attack, decay, sustain, and release. <b className="attack-text">Attack</b> controls the time between when a note is started and it reaches its full volume. 
                <b className="decay-text"> Decay</b> controls the time between when the sound reaches its loudest point until it reaches its sustain level. 
                <b className="sustain-text"> Sustain</b>, unlike the other parameters which are time-based, is a <b>level</b> where the sound stays in its normal, sustained position. 
                <b className="release-text"> Release</b> controls the time from when the note is released until the note's volume reaches 0. 
                <br/><br/>
                Envelopes can be pretty confusing if you've never seen one before. Try out some of the examples below to get a good feel on how envelopes can affect the volume of a sound.
                Also, envelopes don't just have to be for volume. You can set up envelopes to control other parameters like the fundamental frequency or filter cutoffs!
                </div>
                <DemoContainer 
                    onXYPointerDown={this.onXYPointerDown} 
                    onXYPointerMove={this.onXYPointerMove} 
                    onXYPointerUp={this.onXYPointerUp}
                    handleSustainToggle={this.handleSustainToggle}
                    signal={this.synth}
                    ref={this.demoContainRef}
                >
                    <EnvelopesDemo
                    waveSelection={this.state.waveSelection}
                    envelopeRef={this.envelopeRef}
                    envelopePreset={this.state.envelopePreset}
                    envelopeWidth={this.state.envelopeWidth}
                    envelopeHeight={150}
                    envelopeCursorFills={this.state.envelopeCursorFills}
                    envelopePositions={this.state.envelopePositions}
                    dotPosition={this.state.dotPosition}
                    onEnvelopePointerDown={this.onEnvelopePointerDown}
                    onEnvelopePointerMove={this.onEnvelopePointerMove}
                    onEnvelopePointerUp={this.onEnvelopePointerUp}
                    handleWaveChange={this.handleWaveChange}
                    handleEnvelopePresetChange={this.handleEnvelopePresetChange}

                    />
                </DemoContainer>            
            </>
        )
    }

}

export default Envelopes;