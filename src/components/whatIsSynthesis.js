import React from 'react';
import "../styles/whatissynthesis.css"
import DemoContainer from './demoContainer';
import * as Tone from "tone";


function WhatIsSynthesis(){
    let synth = new Tone.Synth();
    synth.triggerAttack(440);
    synth.volume.value = -10;
    // synth.oscillator.type = "t"
    return (
        <>
            <div className="synthesis-content-title">What Is Synthesis?</div>
            <div className="synthesis-content-text">
                <div className="whatissynthesis-quote">
                    I was never worried that synthesizers would replace musicians. 
                    <br/>
                    First of all, you have to be a musician in order to make music with a synthesizer. 
                    <br/>
                    -Robert Moog
                </div>
                <br/>
                <b>Digital Audio Synthesis:</b> The foundation for much of today's music and one of my favorite topics to discuss.
                As a blend of creativity and analytic skills, digital audio synthesis is a collection of techniques to design unique sounds. 
                Digital synthesis has its roots in the late 1950s with Max Matthew's MUSIC I system and became popularized in the 1980s. 
                It is closely related to analog synthesis, and many of the techniques used in digital synthesis were first used in analog synthesizers
                before being modeled digitally. 
                <br/><br/>
                In this guide, I attempt to provide an interactive intruduction to digital synthesis methods. 
                Without the use of a DAW or other software, these demos will showcase the techniques to creating captivating electronic sounds. 
                The techniques shown are heavily used in the music industry today. 
                Intended for students curious about electronic music or audio signal processing who want to get their feet wet in audio synthesis.                
                <br/><br/>
                In every demo, there will be an interactive container (example shown below).
                Each container contains a control surface on the left and an analysis visualization on the right.
                Above the control surface and visualization will be demo-specific controls.
                The control surface on the left, allows control over the sounds' frequency (y-axis) and volume (x-axis). 
                Both of these scales are logarithmic. The sustain button will hold a selected frequency/volume until it is clicked again, allowing
                the manipulation of the demo-specific controls.
                The analysis section contains two graphs: 1) A time-domain graph which shows how the sound is represented as changing position over time and 
                2) A frequency-domain graph which shows the frequency content of the signal with the x-axis set to logarithmic frequency (20-20khz), and the y-axis showing amplitude of the frequencies
                <DemoContainer 
                    onXYPointerDown={()=>{return}} 
                    onXYPointerMove={()=>{return}}
                    onXYPointerUp={()=>{return}}
                    handleSustainToggle={()=>{return}}
                    trigger={false}
                    disabled={true}
                    signal={synth}
                />
            </div>
        </>
    )
}
export default WhatIsSynthesis;