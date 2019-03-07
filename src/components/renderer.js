import React, { Component } from 'react';
import MURV, { Gene } from 'murv-component';
import Config from '../config.js';

class Renderer extends Component{

  constructor(props){
    super(props);
    this.state = {
      genes: []
    }
  }

  onDrop(event){
    if(event.dataTransfer.getData('gene')){
      let data = JSON.parse(event.dataTransfer.getData('gene'));
      this.setState({
          genes: this.state.genes.concat(data)
      });
    }
  }

  onDragOver(event){
    event.stopPropagation();
    event.preventDefault();
  }

  renderMurvs(){
    if(this.state.genes.length > 0){
      console.log(this.state);
      return this.state.genes.map((item, index) => {
        for (var i = 0; i < Object.values(item).length; i++) {
          item[Object.keys(item)[i]] = Gene[Object.keys(item)[i]][Object.values(item)[i]];
        }
        console.log(item);
        return(
          <MURV config={ Config } gene={ new Gene(item) } key={ "vis" + index } />
        )
      });
    } else {
      return;
    }
  }

  render(){
    return(
      <div className="panel left main"
        onDragOver={ (e) => this.onDragOver(e) }
        onDrop={ (e) => this.onDrop(e) }>
        <h2>Rendered Visualisations</h2>
        { this.renderMurvs() }
      </div>
    );
  }
}

export default Renderer;
