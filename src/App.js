import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { spring, AnimatedSwitch } from 'react-router-transition';

import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Projects from './components/projects';
import Synthesis from './components/synthesis';


// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
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
  render(){
    return (
    <BrowserRouter>        
      <div className="app-container">
        <Navigation/>
        <AnimatedSwitch
            atEnter={transition.atEnter}
            atLeave={transition.atLeave}
            atActive={transition.atActive}
            className="route-wrapper"
          >
          <Route path="/about" component={About}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/synthesis" component={Synthesis}/>
          <Route path="/*" component={Home} />
          </AnimatedSwitch>        
      </div>
    </BrowserRouter>        

    )
  }
}

export default App;
