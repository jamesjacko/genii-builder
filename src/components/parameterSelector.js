import React, { Component } from 'react';
import Property from './property.js';

class ParameterSelector extends Component{
  render(){
    return(
      <div className="panel left">
        <h2>Vis Properties</h2>
        <Property value="path_mode" />
        <Property value="shape" />
        <Property value="color" />
        <Property value="path_points" />
        <Property value="object_size" />
      </div>
    )
  }
}

export default ParameterSelector;
