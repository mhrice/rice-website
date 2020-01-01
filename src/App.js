import React, { Component } from 'react';
import './App.css';
import Home from "./components/home";
import Navigation from "./components/navigation";

class App extends Component {
  render(){
    return (
      <div>
        <Navigation/>
        <Home/>
        </div>
    )
  }
}

export default App;
