import React from 'react';
import Tone from "tone";
import { convertToLog, arrSumSquare, arrSum, dbToLinear } from "../utils";

import "../styles/analysisGraph.css"

const FFTSIZE = 1024;
const PLOTSPERTRIGGER = 5;
class AnalysisGraph extends React.Component {
    constructor(){
        super();
        this.state = {
            timeValues: new Array(FFTSIZE).fill(0),
            freqValues: new Array(FFTSIZE).fill(0),
            width: 0,
            trigger: false,
            plotZero: false
        }
        this.analysisGraphContainerRef = React.createRef()
    }

   componentDidMount() {
       let width = this.analysisGraphContainerRef.current.getBoundingClientRect().width;
       this.setState({width: width});
       this.analyser = new Tone.Waveform(FFTSIZE);
       this.connected = false;
       this.waveformCtx = this.waveform.getContext("2d");
       this.startWaveformAnalysis();

   }

   startWaveformAnalysis = () =>{
        if (!this.connected && this.props.signal !== undefined) {
            this.props.signal.connect(this.analyser);
            this.connected = true;
            this.firstLoad = true;
        }
        // Waveform
        let newValues = new Array(FFTSIZE).fill(0);
        let values = this.analyser.getValue();
        let midpoint = this.props.height / 2;
        this.waveformCtx.beginPath();
        this.waveformCtx.moveTo(0, midpoint);
        let valuesPerPixel = FFTSIZE / this.state.width;
        let x = 0;
        let max = 0;
        let min = Infinity;
        for (let i = 0; i < values.length; i += valuesPerPixel) {
            let value = values[Math.round(i)] * midpoint + midpoint;
            this.waveformCtx.lineTo(x, value)
            x++;
            if(value > max){
                max = value;
            }
            if(value < min){
                min = value;
            }
        }

        // Peak triggering
        if(!this.state.plotZero){
            let peak = max - min;
            if (peak > this.state.triggerVolume * 100){
                if(!this.state.trigger){
                    if(this.numPlots < PLOTSPERTRIGGER){
                        this.numPlots++;                    
                    } else {
                        this.numPlots = 0;
                        this.setState({trigger: true});
                    }
                    this.waveformCtx.clearRect(0, 0, this.state.width, this.props.height);

                    this.waveformCtx.stroke();
                }
            }
            if(peak < this.state.triggerVolume * 100) {
                if(this.state.trigger){
                    this.setState({trigger: false});
                    this.waveformCtx.clearRect(0, 0, this.state.width, this.props.height);
                    this.waveformCtx.stroke();
                }
            }
            this.setState({
                values: newValues
            });

            if(this.firstLoad){
                this.waveformCtx.stroke();
                this.firstLoad = false;
            }
        }
    

        requestAnimationFrame(this.startWaveformAnalysis);


   }

   startTrigger = (freq, gain) => {
       if(freq === 0 && gain === 0){
            this.setState({trigger: false, plotZero: true});
            let midpoint = this.props.height / 2;
            this.waveformCtx.clearRect(0, 0, this.state.width, this.props.height);
            this.waveformCtx.beginPath();
            this.waveformCtx.moveTo(0, midpoint);
            this.waveformCtx.lineTo(this.state.width, midpoint);
            this.waveformCtx.stroke();
       } else {
            let volume = dbToLinear(gain);
            this.setState({triggerFreq: freq, triggerVolume: volume, trigger: false, plotZero: false});
       }
   }

    render(){
        return (
            <div className="analysis-graph-container" ref={this.analysisGraphContainerRef}>
                Analysis
                <canvas className="waveform-canvas" width={this.state.width} height={this.props.height} ref={c=>{this.waveform = c}}/>
                <canvas className="frequency-canvas" width={this.state.width} height={this.props.height} ref={c=>{this.frequencyAnalyser = c}}/>
            </div>
        )

    }


}


export default AnalysisGraph;