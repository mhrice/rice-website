import React from 'react';
import * as Tone from "tone"
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
            plotZero: false,
            words: "Analysis"
        }
        this.analysisGraphContainerRef = React.createRef()
    }

   componentDidMount() {
       let width = this.analysisGraphContainerRef.current.getBoundingClientRect().width;
       this.setState({width: width});
       this.waveformAnalyser = new Tone.Waveform(FFTSIZE);
    //    this.frequencyAnalyser = new Tone.FFT(2048);
      this.frequencyAnalyser = new Tone.Analyser('fft', 2048);
    //    console.log(Tone.getContext().sampleRate);
    //    console.log(this.frequencyAnalyser._analyser._analysers[0].frequencyBinCount)
    //    this.frequencyAnalyser.normalRange = true;
    //    console.log(this.frequencyAnalyser.normalRange)
       this.waveformConnected = false;
       this.frequencyConnected = false;
       this.waveformCtx = this.waveform.getContext("2d");
       this.frequencyCtx = this.frequencyAnalysis.getContext("2d");
       this.startWaveformAnalysis();
       this.startFrequencyAnalysis()
       window.addEventListener("resize", this.resize);
   }



   startWaveformAnalysis = () =>{
       if (!this.waveformConnected && this.props.signal !== undefined) {
           this.props.signal.connect(this.waveformAnalyser);
           this.waveformConnected = true;
           this.firstLoad = true;
        }
        // Waveform
        let values = this.waveformAnalyser.getValue();
        let midpoint = this.props.height / 2 - this.props.height * 0.2;
        this.waveformCtx.beginPath();
        this.waveformCtx.moveTo(0, midpoint);
        let valuesPerPixel = FFTSIZE / this.state.width;
        let x = 0;
        let max = 0;
        let min = Infinity;
        let height = this.props.height/1.5;
        let minAllowedValue = 20;
        let maxAllowedValue = this.props.height/2 + 10;

        for (let i = 0; i < values.length; i += valuesPerPixel) {
            let value = values[Math.round(i)] * height + midpoint;
            if(value < minAllowedValue) value = minAllowedValue;
            if(value > maxAllowedValue) value = maxAllowedValue;

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

            if(this.firstLoad){
                this.waveformCtx.stroke();
                this.firstLoad = false;
            }
        }
        if(this.props.signal === undefined || this.props.signal === null){
            this.waveformConnected = false;
        }

        requestAnimationFrame(this.startWaveformAnalysis);

   }

   startFrequencyAnalysis = () =>{
       if (!this.frequencyConnected && this.props.signal !== undefined) {
           this.props.signal.connect(this.frequencyAnalyser);
           this.frequencyConnected = true;
           this.firstLoad = true;
       }
       let values = this.frequencyAnalyser.getValue();
 
       this.frequencyCtx.beginPath();
       this.frequencyCtx.strokeStyle = "#22BBBB";
       this.frequencyCtx.clearRect(0, 0, this.state.width, this.props.height);
       this.frequencyCtx.moveTo(0, this.props.height);
       this.frequencyCtx.lineTo(this.state.width, this.props.height);
        var barWidth = this.state.width / 512;
        for (var i = 0, len = values.length; i < len; i++) {
            let value = values[Math.round(i)];
            if (value < -100) value = -100;
            if (value > -30) value = -30;
            value = (value + 20) / 80 + 1;
            var x = this.state.width * (i / len);
            var y = value * this.props.height/2.5;
            this.frequencyCtx.fillStyle = `rgba(9, 160, 206, ${value})`;
            this.frequencyCtx.fillRect(x, this.props.height - y, barWidth, y);
        }

       this.setState({freqValues: values});
       this.frequencyCtx.stroke();

       requestAnimationFrame(this.startFrequencyAnalysis);
       
    }

   startTrigger = (freq, gain) => {
       if(freq === 0 && gain === 0){
            this.setState({trigger: false, plotZero: true});
            let midpoint = this.props.height / 2 - this.props.height * 0.2;
            this.waveformCtx.clearRect(0, 0, this.state.width, this.props.height);
            this.waveformCtx.beginPath();
            this.waveformCtx.moveTo(0, midpoint);
            this.waveformCtx.lineTo(this.state.width, midpoint);
            this.waveformCtx.stroke();
       } else {
            let volume = dbToLinear(gain);
            this.setState({triggerFreq: freq, triggerVolume: volume, trigger: false, plotZero: false});
       }

    //    console.log(this.state.freqValues.map(value=>(value < -50) ? 0:value))
   }

   resetSignal = () =>{
        this.frequencyConnected = false;
        this.waveformConnected = false;
   }

   resize = () =>{
//    console.log(this.analysisGraphContainerRef.current)
    let width;
    if (this.analysisGraphContainerRef.current === null){
        width = this.state.width;
    } else {
        width = this.analysisGraphContainerRef.current.getBoundingClientRect().width;
    }
    this.setState({width:width});
    let midpoint = this.props.height / 2 - this.props.height * 0.2;
    this.waveformCtx.moveTo(0, midpoint);
    this.waveformCtx.lineTo(this.state.width, midpoint);
    this.waveformCtx.stroke();
   }


    render(){
        return (
            <div className="analysis-graph-container" ref={this.analysisGraphContainerRef}>
                <div className="waveform-title">Time</div>
                <canvas className="waveform-canvas" width={this.state.width} height={this.props.height} ref={c=>{this.waveform = c}}/>
                <div className="frequency-title">Frequency</div>
                <canvas className="frequency-canvas" width={this.state.width} height={this.props.height} ref={c=>{this.frequencyAnalysis = c}}/>
            </div>
        )

    }


}


export default AnalysisGraph;