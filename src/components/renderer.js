import React, { Component } from 'react';
import MURV, { Gene } from 'murv-component';
import Config from '../config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import _Gene from './gene.js'

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

  voteSelected(event){
    event.persist();
    console.log(event);
    if(event.target.localName === "svg"){
      for (var i = 0; i < event.target.parentElement.children.length; i++) {
        event.target.parentElement.children[i].classList.remove('selected');
      }
      event.target.classList.add('selected');
    }
  }

  togglePath(event){
    document.querySelector('.main').classList.toggle('showPath', event.target.checked);

  }

  renderMurvs(){
    if(this.state.genes.length > 0){
      return this.state.genes.map((item, index) => {
        let preservedItem = { ...item };
        let newItem = { ...item };
        for (var i = 0; i < Object.values(item).length; i++) {
          newItem[Object.keys(newItem)[i]] = Gene[Object.keys(newItem)[i]][Object.values(newItem)[i]];
        }
        newItem.debugging = 2;
        return(
          <div className="vis" key={ "vis" + index }>
            <MURV config={ Config } gene={ new Gene(newItem) } />
            <div className="overlay" onClick={ (e) => this.voteSelected(e) }>
              <FontAwesomeIcon icon={faThumbsUp} />
              <FontAwesomeIcon icon={faThumbsDown} />
            </div>
            <_Gene { ...preservedItem } />
          </div>
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
        <h2>Rendered Visualisations <span><input type="checkbox" onChange={ (e) => this.togglePath(e) } />Show Path</span></h2>
        <p>Select which visualisations you like and which you don't, when you select you will be asked to briefly describe your reasoning behind your decision. Feel free to create as many or few visualisations as you like.</p>
        { this.renderMurvs() }
      </div>
    );
  }
}

export default Renderer;
