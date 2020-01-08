import React, { Component } from 'react';
import "../styles/piano.css";
import Tone from "tone";

import {midiToFreq} from "../utils";

const START_KEY = 45;
const END_KEY = 87;
const START_PERCENT = 12.5;
const NUM_KEYS = START_KEY - END_KEY;
const keyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


function Key(props){
    let position = props.position;
    let className;
    if(props.blackKey){
        className = "piano-key black-key";
        position -= 1.5
    } else {
        className = "piano-key white-key";
    }
    
    position +="%";
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

    }

    handlePointerDown = (e, midiNum) =>{
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


    createKeyboard = () =>{
        let x = 0;
        let keyboard = [];
        let whiteKeyPosition = START_PERCENT;
        for(let i = START_KEY; i < END_KEY; i++){
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
                whiteKeyPosition += 3;
            }
        }
        return keyboard
    }
    render(){
        return (
            <div className="piano-container" onPointerLeave={this.handlePointerUp}>
                {/* <button className="piano-sustain-button"> <i>Sustain </i>(shift) </button> */}
                {this.createKeyboard()}
            </div>
        )
    }
}
export default Piano;