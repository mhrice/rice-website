import React, { Component } from 'react';
import "../styles/piano.css";
import * as Tone from "tone";

import {midiToFreq} from "../utils";

const START_PERCENT_OF_SCREEN = 0.2;
const END_PERCENT_OF_SCREEN = 0.8;
const keyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const KEY_SIZE = 40;
const MIDDLE_NOTE = 60; 

const SOUND_SELECTIONS = [
    {
        name: "preset1",
        synth: Tone.Synth,
        options: {
            envelope: {
                attack: 0.01
            }
        }
    },
    {
        name: "preset2",
        synth: Tone.Synth,
        options: {
            oscillator: {
                type: "custom",
                partials: [1, 0.12, 0.19, 0, 0.48, 0.21, 0.24, 0.52, 0, 0, 0.38, 0.23, 0.17, 0.12, 0.25, 0, 0, 0.06, 0.06, 0.06, 0.09, 0.10, 0, 0.1, 0.02, 0, 0.03]
            },
            envelope: {
                attack: 0.01
            }
        }
    },
    {
        name: "preset3",
        synth: Tone.FMSynth,
        options: {
            envelope: {
                attack: 0.01
            },
            harmonicity: 1,
            modulationIndex: 30,
            modulationEnvelope: {
                attack: 0.1
            }
        }
    },
    {
        name: "preset4",
        synth: Tone.DuoSynth,
        options: {
            envelope: {
                attack: 0.01,
            },
        }
    }
];
    
function Key(props){
    let position = props.position;
    let className;
    let color;
    if(props.blackKey){
        className = "piano-key black-key";
        position -= 20
    } else {
        className = "piano-key white-key";
    }
    position += "px";
    let style = {left: position};
    if (props.color === "gold"){
        color = "gold";
    } else {
        color = "#"+Math.floor(Math.random()*16777215).toString(16);
    }
    if (props.isCurrentNote){
        style = {
            left: position,
            backgroundColor: color,
            boxShadow: "none",
            marginTop: "5px"

        }
    }
    return (
        <div 
        className={className} 
        style={style} 
        onPointerDown={props.onPointerDown}
        onPointerOver={props.onPointerOver}
        onPointerMove={props.onPointerMove}
        onPointerUp={props.onPointerUp}

        >
        {props.number === 60 && <div className="middle-c"></div>}    
        </div>
    )
}



class Piano extends Component {
    constructor(){
        super();
        this.state = {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            startKey: 59,
            endKey: 61,
            soundChoice: "preset1",
            color: "random",
            started: true,
        }
    }
    componentDidMount(){
        this.allowed = true;
        this.PointerDown = false;
        this.synth = new Tone.PolySynth().toDestination();
        window.oncontextmenu = function (event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        this.calculateKeyPositions();
        window.addEventListener("resize", this.calculateKeyPositions);
        window.addEventListener("orientationchange", this.calculateKeyPositions);
    }

    componentWillUnmount(){
        window.removeEventListener("resize", this.calculateKeyPositions);
        window.removeEventListener("orientationchange", this.calculateKeyPositions);
        document.removeEventListener("pointerup", this.handlePointerUp);

    }

    handlePointerDown = (e, midiNum) =>{
        e.preventDefault();
        if (this.state.started){
            this.over = false;
            if (e.repeat !== undefined) {
                this.allowed = !e.repeat;
            }
            if (!this.allowed) return;
            this.allowed = false;
            this.PointerDown = true;
            this.note = midiToFreq(midiNum)
            this.synth.triggerAttack(midiToFreq(midiNum));
            this.setState({currentNote: midiNum})
            document.addEventListener("pointerup", this.handlePointerUp);

        } else {
            this.setState({highlightEnable: true});
        }
    }

    handlePointerMove = e => {
        e.preventDefault();
        if (this.state.started){
            this.over = false;
            if(e.pointerType === "touch"){
                this.synth.triggerRelease(this.note);
                this.allowed = true;
                this.PointerDown = false;
            }
        }


    }

    handlePointerOver = (e, midiNum) => {
        e.preventDefault();
        if (this.state.started){
            this.over = true;
            if(this.PointerDown && this.note !== midiToFreq(midiNum)){
                this.synth.triggerRelease(this.note);
                this.synth.triggerAttack(midiToFreq(midiNum));
                this.note = midiToFreq(midiNum);
                this.setState({currentNote: midiNum});

            }
        }
    }

    handlePointerUp = (e) =>{
        e.preventDefault();
        if (this.state.started){
            this.over = false;
            this.allowed = true;
            this.PointerDown = false;
            this.synth.triggerRelease(this.note);
            this.setState({currentNote: -1});
        }

    }



    calculateKeyPositions = () =>{
        let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const START_PIXEL = START_PERCENT_OF_SCREEN * width;
        const END_PIXEL = END_PERCENT_OF_SCREEN * width;
        let i = (END_PIXEL + START_PIXEL) / 2;
        let currentNote = MIDDLE_NOTE;
        // Left side
        while (i >= START_PIXEL) {
            let keyName = keyNames[currentNote % 12];
            let blackKey = keyName.indexOf("#") !== -1;
            if (!blackKey) {
                i -= KEY_SIZE;
            }
            currentNote--;
        }
        let startKey = currentNote;
        i = (END_PIXEL + START_PIXEL) / 2;
        currentNote = MIDDLE_NOTE;
        // Right side 
        while ((i+KEY_SIZE) <= END_PIXEL) {
            let keyName = keyNames[currentNote % 12];
            let blackKey = keyName.indexOf("#") !== -1;
            if (!blackKey) {
                i += KEY_SIZE;
            }
            currentNote++;
        }
        let endKey = currentNote - 1;

        this.setState({
            startKey: startKey,
            endKey: endKey,
            width: width
        })
    }
    createKeyboard = () =>{
        let keyboard = [];
        let whiteKeyPosition = this.state.width * START_PERCENT_OF_SCREEN;
        let {startKey, endKey} = this.state;
        if (keyNames[startKey % 12].indexOf("#") !== -1){            
            // Cannot start with Black Key
            startKey --;
        }
        if (keyNames[(endKey) % 12].indexOf("#") !== -1) {
            // Cannot end with Black Key
            endKey++;
        }
        for(let i = startKey; i <= endKey; i++){
            let keyName = keyNames[i % 12];
            let blackKey = keyName.indexOf("#") !== -1;
            keyboard.push(
            <Key 
            keyName={keyName} 
            position={whiteKeyPosition} 
            blackKey={blackKey} 
            number={i} 
            key={i} 
            color={this.state.color}
            onPointerDown={e=>this.handlePointerDown(e, i)}
            onPointerOver={e=>this.handlePointerOver(e, i)}
            onPointerMove={this.handlePointerMove}
            onPointerUp={this.handlePointerUp}
            isCurrentNote={this.state.currentNote === i}
            />
            )
            if(!blackKey){
                whiteKeyPosition += 40;
            }
        }
        return keyboard
    }

    handleOptionsChange = option =>{
        this.setState({soundChoice: option.name});
        this.synth.dispose();
        // console.log(option.synth)
        this.synth = new Tone.PolySynth({voice: option.synth}).toDestination();


        this.synth.set(option.options);
        // this.synth.set({
        //     oscillator: {
        //         type: "custom",
        //         partials: [1, 0.2, 0.2]
        //     }
        // })
        // console.log(this.synth)
        // console.log(this.synth._voices)
    }

    renderSoundSelections = () =>{
        return (
            SOUND_SELECTIONS.map((sound, i)=>{
                let style;
                if (this.state.soundChoice === sound.name){
                    style={"backgroundColor": "rgba(127, 67, 37, 0.5)"};
                } else {
                    style={"backgroundColor": "#00010F"};
                }
               return (
                <React.Fragment key={i}>
                <div 
                    style={style}
                    onClick={e=>this.handleOptionsChange(sound)}
                    key={i}
                    className="piano-sound-selection"
                ></div>
                </React.Fragment>
               )
            })
        )
    }




    render(){
        let buttonClassname = !this.state.started ? "piano-colors-button" : "piano-colors-button piano-colors-button-active";
        let buttonText = !this.state.started ? "Turn on Piano" : "Piano On!";
        return (
            <div className="piano-container" onPointerLeave={this.handlePointerUp}>
                <div className="piano-options-container">
                    <div className="piano-sound-selection-container">
                        {this.renderSoundSelections()}
                    </div>
                </div>
                <div className="piano-keyboard-container" onPointerLeave={this.handlePointerUp}>
                {/* <button className="piano-sustain-button"> <i>Sustain </i>(shift) </button> */}
                {this.createKeyboard()}
                </div>
            </div>
        )
    }
}
export default Piano;