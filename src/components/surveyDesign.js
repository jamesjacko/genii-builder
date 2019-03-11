import React, { Component } from 'react';
import ParameterSelector from './parameterSelector.js';
import GeneBuilder from './geneBuilder.js';
import Renderer from './renderer.js';

class SurveyDesign extends Component{
  render(){
    return(
      <div>
        <ParameterSelector />
        <GeneBuilder />
        <Renderer />
      </div>
    )
  }
}
export default SurveyDesign;
