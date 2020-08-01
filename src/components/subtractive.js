import React from 'react';
import * as Tone from "tone"
import { convertToLog, arrMax, arrSum, getFreq, getGain } from "../utils";
import DemoContainer from './demoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import "../styles/subtractive.css"

const filterPresets = ["All-Pass", "Low-Pass", "High-Pass", "Band-Pass", "Comb", "Mystery"]
function SubtractiveDemo(props){
    return (
        <div className="subtractive-demo-container">
            <div className="subtractive-sound-selection-container">
                <div className="subtractive-sound-selection-input-container">
                    <div className="wave-selection-title">Wave</div>
                    <div className="wave-selection-input">
                        <FontAwesomeIcon className="wave-selection-input-left" icon={faCaretLeft}/>
                        {props.waveSelection}
                        <FontAwesomeIcon className="wave-selection-input-right" icon={faCaretRight}/>
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
            <div className="subtractive-filter-container">
                <svg className="subtractive-filter"
                    onPointerDown={props.onFilterPointerDown} 
                    onPointerMove={props.onFilterPointerMove} 
                    onPointerUp={props.onFilterPointerUp} 
                    ref={props.filterRef}>

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
            filterPreset: "All-Pass"
        }
        this.filterRef = React.createRef()
    }

    componentDidMount(){
        this.synth = new Tone.Synth();
    }

    onXYPointerDown = () =>{

    }

    onXYPointerMove = () =>{

    }

    onXYPointerUp = () =>{

    }

    handleSustainToggle = () =>{

    }

    render(){
        return (
            <>
                <div className="synthesis-content-title">Subtractive</div>
                <div className="synthesis-content-text">
                Subtractive synthesis is a popular option to create rich warm tones, pioneered in analog synths in the 1960s.
                Using subtractive synthesis is like being a sculptor: A harmonically rich sound (like a sawtooth wave or even noise) is cut away to find to beautiful sound underneath. 
                This process is called <b>filtering</b>, and it is a fundamental technique is working with sound.
                <br/><br/>
                There are three basic types of filters: <b>low-pass</b>, <b>high-pass</b>, and <b>band-pass</b>. Their names describe their purpose. 
                The low-pass filter removes high frequency content, while allowing low frequencies to pass through,  up to a defined cutoff point. 
                The high-pass filter removes low frequency content, while allowing high frequencies to pass though, again up to defined cutoff point. 
                The band-pass filter is a combination of the two, allowing a range or band or frequencies to pass through, with low and high cutoff points. 
                Try changing the filters below to hear how they affect the sound. 

                </div>
                <DemoContainer 
                    onXYPointerDown={this.onXYPointerDown} 
                    onXYPointerMove={this.onXYPointerMove} 
                    onXYPointerUp={this.onXYPointerUp}
                    handleSustainToggle={this.handleSustainToggle}
                    signal={this.synth}
                >
                    <SubtractiveDemo
                    waveSelection={this.state.waveSelection}
                    filterRef={this.filterRef}
                    filterPreset={this.state.filterPreset}
                    />
                </DemoContainer>            
            </>
        )
    }

}

export default Subtractive;