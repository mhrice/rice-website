import React, { Component } from 'react';
import "../styles/piano.css";
import Tone from "tone";

import {midiToFreq} from "../utils";

const START_KEY = 45;
const END_KEY = 87;
const START_PERCENT = 12.5;
const NUM_KEYS = START_KEY - END_KEY;
const keyNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const blackOrWhite = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]


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
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}>
        {props.number === 60 && <div className="middle-c"></div>}    
        </div>
    )
}



class Piano extends Component {
    componentDidMount(){
        Tone.context.lookAhead = 0;
        this.synth = new Tone.Synth().toMaster();

    }

    handleMouseDown = (e, midiNum) =>{
        this.synth.triggerAttack(midiToFreq(midiNum), "8n");
        // console.log(midiNum)
    }

    handleMouseUp = (e) =>{
        this.synth.triggerRelease();
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
            onMouseDown={e=>this.handleMouseDown(e, i)}
            onMouseUp={this.handleMouseUp}
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
            <div className="piano-container">
                {this.createKeyboard()}
            </div>
        )
    }
}
export default Piano;