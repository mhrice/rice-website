import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/navigation";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './components/home';
import About from './components/about';
import Contact from './components/contact';
import Projects from './components/projects';
import Synthesis from './components/synthesis';


class App extends Component {
  render(){
    return (
    <BrowserRouter>        
      <div className="app-container">
        <Navigation/>
          <Switch>
          <Route path="/about" component={About}/>
          <Route path="/projects" component={Projects}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/synthesis" component={Synthesis}/>
          <Route path="/*" component={Home} />
          </Switch>        
      </div>
    </BrowserRouter>        

    )
  }
}

export default App;
