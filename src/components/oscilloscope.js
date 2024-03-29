import React from 'react';
import * as Tone from "tone"
import "../styles/oscilloscope.css";

const HEIGHT = 100;
const WIDTH = 300;
const FFTSIZE = 1024;
class Oscilloscope extends React.Component {
    constructor(){
        super();
        this.state = {
            values: new Array(FFTSIZE).fill(0)
        }
        
    }
    
    componentDidMount(){
        this.analyser = new Tone.Waveform(FFTSIZE);
        console.log(this.analyser)
        this.connected = false;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.strokeStyle = "#22BBBB";
        this.startAnalysis();

    }

    startAnalysis = ()=>{
        if(!this.connected && this.props.signal !== undefined){
            this.props.signal.connect(this.analyser);
            this.connected = true;
        }
        let newValues = new Array(FFTSIZE).fill(0);
        let values = this.analyser.getValue();
        let midpoint = HEIGHT/2; 
        this.ctx.beginPath();
        this.ctx.moveTo(0, midpoint);
        let valuesPerPixel = FFTSIZE / WIDTH;
        let x = 0;
        this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for(let i = 0; i < values.length; i+=valuesPerPixel){
            let value = values[Math.round(i)]*midpoint+midpoint;
            this.ctx.lineTo(x, value)
            x++;
        }
        this.ctx.stroke();
        this.setState({values: newValues})
        requestAnimationFrame(this.startAnalysis);

    }

    render(){
    return (
        <div className="oscilloscope-container">
        <div className="oscilloscope-title">Waveform</div>
        <canvas
        width={WIDTH}
        height={HEIGHT}
        className="oscilloscope-canvas"
        ref={c=>{this.canvas = c}}
        />
        </div>
    )
    }
}
export default Oscilloscope;