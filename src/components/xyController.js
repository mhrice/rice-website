import React from 'react';

import "../styles/xy.css"
import { getFreq } from "../utils";

class XYController extends React.Component {
    constructor(){
        super();
        this.state = {
            x: 0,
            y: 150,
            freq: 0,
            fill: "none",
            sustain: false

        }
        this.svgRef= React.createRef();
    }
    componentDidMount(){
        this.down = false
        if(this.props.setForSynthIntro){
            this.setState({x: 100, y: 171, freq: 440});
        }


    }

    componentWillUnmount(){
        document.removeEventListener("pointerup", this.onPointerUp)
    }

    onPointerDown = e =>{
        e.preventDefault();
        this.down = true;
        let rect = this.svgRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top; //y position within the element.
        let freq = getFreq((1 - y / rect.height), 50, 8000);
        this.setState({x:x, y: y, fill: "rgb(9, 160, 206)", freq: freq});
        this.props.onPointerDown(x / rect.width, y / rect.height);
        document.addEventListener("pointerup", this.onPointerUp)

    }

    onPointerMove = e =>{
        e.preventDefault();
        if(this.down && ! this.isSustaining){
            // console.log("MOVE")
            // let rect = e.target.getBoundingClientRect();
            let rect = this.svgRef.current.getBoundingClientRect();
            let x = e.clientX - rect.left; //x position within the element.
            let y = e.clientY - rect.top; //y position within the element.
            // let x = e.clientX;
            // let y = e.clientY;
            let freq = getFreq((1 - y / rect.height), 50, 8000);
            this.setState({ x: x, y: y, freq: freq});
            this.props.onPointerMove(x / rect.width, y / rect.height);
        }
    }


    onPointerUp = e =>{
        e.preventDefault();
        if(!this.state.sustain){
            this.down = false;
            this.setState({fill: "none"})
            this.props.onPointerUp();
        } else {
            this.isSustaining = true;
        }
        document.removeEventListener("pointerup", this.onPointerUp)
    }

    // onPointerOut = e => {
    //     this.onPointerUp(e);
    // }

    handleSustainToggle = (e) =>{
        this.setState({sustain: !this.state.sustain, fill: "none"});
        this.isSustaining = false;
        this.down = false;
        this.props.handleSustainToggle();
    }


    render(){
        let rotateX = this.props.width - 15;
        let rotateY = 75;
        let transformString = `rotate(-90 ${rotateX} ${rotateY})`
        let demoStyle;
        if (this.props.setForSynthIntro) {
            demoStyle = {
                "cursor": "not-allowed",
            }
        }
        return (
            <div className="xy-container" onPointerLeave = {this.onPointerOut} style={demoStyle}>
                <svg 
                    width = {this.props.width} 
                    height = {this.props.height} 
                    onPointerDown={this.onPointerDown} 
                    onPointerMove={this.onPointerMove} 
                    onPointerUp={this.onPointerUp} 
                    ref={this.svgRef}
                >
                    <circle cx={this.state.x} cy={this.state.y} r="7" fill={this.state.fill} stroke="rgb(9, 160, 206)" strokeWidth={3}/>
                    <text x={this.props.width - 15} y="75" fontFamily="sans-serif" fontSize="12px" fill="rgba(9, 160, 206, 0.5)" transform={transformString}>Frequency</text>
                    <text x="20" y={this.props.height - 10} fontFamily="sans-serif" fontSize="12px" fill="rgba(9, 160, 206, 0.5)">Amplitude</text>
                    <text x={this.props.width - 50} y={this.props.height - 10} fontFamily="sans-serif" fontSize="10px" fill="rgba(0, 0, 0, 0.5)">{this.state.freq + " Hz"}</text>

                </svg>
                <div className="sustain-button" onClick={this.handleSustainToggle} style={{"backgroundColor": this.state.sustain ? "#616161":"transparent", color:this.state.sustain ? "#EEEEEE":"#616161"}}>Sustain</div>
            </div>
        )

    }


}


export default XYController;