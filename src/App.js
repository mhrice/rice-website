import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation";
import { BrowserRouter, Route} from "react-router-dom";
import { spring, AnimatedSwitch } from 'react-router-transition';

import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Projects from './components/projects';
import Synthesis from './components/synthesis';
import Music from "./components/music";


function NotFoundPage(props){

  return (
    <div className="not-found-page">No Content Here</div>
  )
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 200,
    damping: 30,
  });
}

const transition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
  },
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      atHome: true
    }
  }
  homeMounted = atHome => {
    // console.log("Hi", b)

    this.setState({atHome: atHome});
  }

  render(){
    let className;
    if(this.state.atHome){
      className="app-container";
    } else {
      className="app-container-grey-background";
    }

    return (
    <BrowserRouter>        
      <div className={className}>
        <Navigation/>
        <AnimatedSwitch
            atEnter={transition.atEnter}
            atLeave={transition.atLeave}
            atActive={transition.atActive}
            className="route-wrapper"
          >
          <Route path="/about" component={About}/>
          <Route path="/work" component={Projects}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/synthesis" component={Synthesis}/>
          <Route path="/music" component={Music}/>
          <Route exact path="/" render={props=> <Home {...props} homeMounted={this.homeMounted}/>}/>
          <Route path = "/*" component={NotFoundPage} />
          </AnimatedSwitch> 
      </div>
    </BrowserRouter>        

    )
  }
}

export default App;
