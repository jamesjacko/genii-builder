import React, { Component } from 'react';
import './App.css';
import ParameterSelector from './components/parameterSelector.js';
import GeneBuilder from './components/geneBuilder.js';
import Renderer from './components/renderer.js';
import firebase, { sendData } from './utils/firebase.js';
import TimedButton from './utils/timedButton.js';

class App extends Component {
  buttonClick(){
    alert("Hello");
  }
  render() {
    return (
      <div className="App">
        <h1>Micro-Visualisation Designer <TimedButton text="Next" duration={ 300000 } actions={ { click: this.buttonClick.bind(this) } } /></h1>
        <ParameterSelector />
        <GeneBuilder />
        <Renderer />
      </div>
    );
  }
}

export default App;
