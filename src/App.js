import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation";
import { BrowserRouter, Route } from "react-router-dom";
import { spring, AnimatedSwitch } from 'react-router-transition';

import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Projects from './components/projects';
import Synthesis from './components/synthesis';
import Music from "./components/music";
import Resume from './components/resume';

import HeartLogo from "./resources/heart.svg"


function NotFoundPage(props) {

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

function Heart(props) {
  return (
    <img
      src={HeartLogo}
      className="heart"
      alt="heart!"
      style={{
        left: props.position,
        animationDuration: props.duration,
        animationDelay: props.delay
      }}
      moveDown={'1'}
    />
  )

}

class App extends Component {
  constructor() {
    super();
    this.state = {
      atHome: true,
      enableHearts: 0,
      hearts: []
    }
  }
  homeMounted = atHome => {
    // console.log("Hi", b)

    this.setState({ atHome: atHome });
  }

  showHearts = enable => {
    if (enable) {
      this.setState({ enableHearts: 1 })
      let hearts = [...new Array(200)].map(() => {
        return {
          position: Math.round(Math.random() * 100) + "vw",
          duration: Math.random() * 3 + 2 + "s",
          delay: Math.random() * 1 + "s",
          id: Math.random()
        }
      });

      this.setState({ hearts: hearts })
    } else {
      this.setState({ enableHearts: 0 })
    }
  }


  renderHearts() {
    console.log(this.state.hearts)
    return (
      <div className='heart-container'>
        {
          this.state.hearts.map(heart => {
            return <Heart position={heart.position} duration={heart.duration} delay={heart.delay} key={heart.id} />
          })
        }
      </div>
    )
  }

  render() {
    let className;
    if (this.state.atHome) {
      className = "app-container";
    } else {
      className = "app-container-grey-background";
    }

    return (
      <BrowserRouter>
        {this.state.enableHearts == "1" && this.renderHearts()}
        <div className={className} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/background.webp"})` }} >
          <Navigation />
          <AnimatedSwitch
            atEnter={transition.atEnter}
            atLeave={transition.atLeave}
            atActive={transition.atActive}
            className="route-wrapper"
          >
            <Route path="/about" render={props => <About {...props} showHearts={this.showHearts} />} />
            <Route path="/projects" component={Projects} />
            <Route path="/contact" component={Contact} />
            <Route path="/synthesis" component={Synthesis} />
            <Route path="/music" component={Music} />
            <Route path="/resume" component={Resume} />
            <Route exact path="/" render={props => <Home {...props} homeMounted={this.homeMounted} />} />
            <Route path="/*" component={NotFoundPage} />
          </AnimatedSwitch>
        </div>
      </BrowserRouter>

    )
  }
}

export default App;
