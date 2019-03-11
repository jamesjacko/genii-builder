import React, { Component } from 'react';
import Property from './property.js';
import Data from './data.js';

class ParameterSelector extends Component{
  render(){
    return(
      <div className="panel left">
        <h2>Vis Properties</h2>
        <p>You are creating visualisatoins of data which depicts a student's achievement on their first semester. First you need to decide on the properties of the visualisation. Select values from each property and drag them onto a gene in the next column.</p>
        <p className="step">1: Select a Path</p>
        <Property value="path_mode" />
        <p className="step">2: Add some properties</p>
        <Property value="shape" />
        <Property value="color" />
        <Property value="path_points" />
        <Property value="object_size" />
        <p className="step">3: Add some data</p>
        <Data />
      </div>
    )
  }
}

export default ParameterSelector;
