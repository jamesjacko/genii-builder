import React, { Component } from 'react';
import './App.css';
import ParameterSelector from './components/parameterSelector.js';
import GeneBuilder from './components/geneBuilder.js';
import Renderer from './components/renderer.js';
import firebase, { sendData } from './utils/firebase.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Micro-Visualisation Designer</h1>
        <ParameterSelector />
        <GeneBuilder />
        <Renderer />
      </div>
    );
  }
}

export default App;
