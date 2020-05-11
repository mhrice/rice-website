import React, { Component } from 'react';
import "../styles/piano.css";
import Tone from "tone";

import {midiToFreq} from "../utils";

const START_PERCENT_OF_SCREEN = 0.2;
const END_PERCENT_OF_SCREEN = 0.8;
const keyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const KEY_SIZE = 40;
const MIDDLE_NOTE = 60; 

const SOUND_SELECTIONS = ["SINE", "SQUARE", "TRIANGLE", "SAW", "CUSTOM"];
    
function Key(props){
    let position = props.position;
    let className;
    if(props.blackKey){
        className = "piano-key black-key";
        position -= 20
    } else {
        className = "piano-key white-key";
    }
    position +="px";
    return (
        <div 
        className={className} 
        style={{left: position}} 
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
            width: window.innerWidth,
            startKey: 59,
            endKey: 61,
            soundChoice: "SINE"
        }
    }
    componentDidMount(){
        Tone.context.lookAhead = 0;
        this.synth = new Tone.PolySynth().toMaster();
        this.allowed = true;
        this.PointerDown = false;
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

    }

    handlePointerDown = (e, midiNum) =>{
        e.preventDefault();
        this.over = false;
        console.log("DOWN")
        if (e.repeat != undefined) {
            this.allowed = !e.repeat;
        }
        if (!this.allowed) return;
        this.allowed = false;
        this.PointerDown = true;
        this.note = midiToFreq(midiNum)
        this.synth.triggerAttack(midiToFreq(midiNum));
    }

    handlePointerMove = e => {
        e.preventDefault();
        this.over = false;
        if(e.pointerType === "touch"){
            this.synth.triggerRelease(this.note);
            this.allowed = true;
            this.PointerDown = false;
        }


    }

    handlePointerOver = (e, midiNum) => {
        e.preventDefault();
        console.log("OVER")
        this.over = true;
        if(this.PointerDown && this.note !== midiToFreq(midiNum)){
            console.log(this.note)
            this.synth.triggerRelease(this.note);
            this.synth.triggerAttack(midiToFreq(midiNum));
            this.note = midiToFreq(midiNum)
        }
    }

    handlePointerUp = (e) =>{
        this.over = false;
        console.log("UP")
        this.allowed = true;
        this.PointerDown = false;
        this.synth.triggerRelease(this.note);
    }



    calculateKeyPositions = () =>{
        let width = window.innerWidth;
        console.log(width)
        const START_PIXEL = START_PERCENT_OF_SCREEN * width;
        const END_PIXEL = END_PERCENT_OF_SCREEN * width;
        let totalNumKeys = 0;
        let i = (END_PIXEL + START_PIXEL) / 2;
        let currentNote = MIDDLE_NOTE;
        // Left side
        while (i >= START_PIXEL) {
            let keyName = keyNames[currentNote % 12];
            let blackKey = keyName.indexOf("#") !== -1;
            if (!blackKey) {
                i -= KEY_SIZE;
            }
            totalNumKeys++;
            currentNote--;
        }
        let startKey = currentNote;
        i = (END_PIXEL + START_PIXEL) / 2;
        currentNote = MIDDLE_NOTE;
        // Right side 
        while (i <= END_PIXEL) {
            let keyName = keyNames[currentNote % 12];
            let blackKey = keyName.indexOf("#") !== -1;
            if (!blackKey) {
                i += KEY_SIZE;
            }
            totalNumKeys++;
            currentNote++;
        }
        let endKey = currentNote;

        this.setState({
            startKey: startKey,
            endKey: endKey,
            width: width
        })
    }
    createKeyboard = () =>{
        let x = 0;
        let keyboard = [];
        // let whiteKeyPosition = START_PERCENT_OF_SCREEN/100;
        let whiteKeyPosition = this.state.width * START_PERCENT_OF_SCREEN;
        let {startKey, endKey} = this.state;
        if (keyNames[startKey % 12].indexOf("#") !== -1){            
            // Cannot start with Black Key
            startKey --;
        }
        if (keyNames[(endKey - 1) % 12].indexOf("#") !== -1) {
            // Cannot end with Black Key
            endKey++;
        }
        for(let i = startKey; i < endKey; i++){
            let keyName = keyNames[i % 12];
            let blackKey = keyName.indexOf("#") !== -1;
            keyboard.push(
            <Key 
            keyName={keyName} 
            position={whiteKeyPosition} 
            blackKey={blackKey} 
            number={i} 
            key={i} 
            onPointerDown={e=>this.handlePointerDown(e, i)}
            onPointerOver={e=>this.handlePointerOver(e, i)}
            onPointerMove={this.handlePointerMove}
            onPointerUp={this.handlePointerUp}

            />
            )
            if(!blackKey){
                x++;
                // whiteKeyPosition += 3;
                whiteKeyPosition += 40;
                // whiteKeyPositionString = `${whiteKeyPosition * this.state.width}px`;
            }
        }
        return keyboard
    }

    handleOptionsChange = option =>{
        this.setState({soundChoice: option})
    }

    renderSoundSelections = () =>{
        console.log(this.state.soundChoice)
        return (
            SOUND_SELECTIONS.map((sound, i)=>{
                let style;
                if (this.state.soundChoice === sound){
                    style={"backgroundColor": "rgba(127, 67, 37, 0.5)"};
                } else {
                    style={"backgroundColor": "#00010F"};
                }
               return (
                <>
                <div 
                    style={style}
                    onClick={e=>this.handleOptionsChange(sound)}
                    key={i}
                    className="piano-option"
                ></div>
                </>
               )
            })
        )
    }


    render(){
        return (
            <div className="piano-container" onPointerLeave={this.handlePointerUp}>
                <div className="piano-options-container">
                    {this.renderSoundSelections()}
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