import React, { Component } from 'react';
import MURV, { Gene as MurvGene } from 'murv-component';
import Config, { Config1, Config2 } from '../config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import Gene from './gene.js';
import { sendData, getGeneKey, setGeneResponse } from '../utils/firebase.js';

class Renderer extends Component{

  constructor(props){
    super(props);
    this.state = {
      genes: [],
      key: window.localStorage.getItem('firebase_key')
    }
  }

  onDrop(event){
    if(event.dataTransfer.getData('gene')){
      let data = JSON.parse(event.dataTransfer.getData('gene'));
      data = { gene: { ...data }, key: getGeneKey(this.state.key)}
      this.setState({
          genes: this.state.genes.concat(data)
      });
      console.log(data);
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
      console.log(event.target.getAttribute('data-index'))
      let gene = this.state.genes[event.target.getAttribute('data-index')];
      setGeneResponse(this.state.key, gene.key, gene.gene, event.target.classList.contains('fa-thumbs-up'));
    }
  }

  togglePath(event){
    document.querySelector('.main').classList.toggle('showPath', !event.target.checked);
  }

  renderMurvs(){
    if(this.state.genes.length > 0){
      return this.state.genes.map((item, index) => {
        let preservedItem = { ...item.gene };
        let newItem = { ...item.gene };
        for (var i = 0; i < Object.values(newItem).length; i++) {
          newItem[Object.keys(newItem)[i]] = MurvGene[Object.keys(newItem)[i]][Object.values(newItem)[i]];
        }
        newItem.debugging = 2;
        let newConfig = Config;

        if(newItem.config){
          switch (newItem.config) {
            case 1:
              newConfig = Config;
              break;
            case 2:
              newConfig = Config1;
              break;
            case 3:
              newConfig = Config2;
              break;
            default:
              newConfig = Config
          }
        }

        return(
          <div className="vis" key={ "vis" + index }>
            <MURV config={ newConfig } gene={ new MurvGene(newItem) } />
            <div className="overlay" onClick={ (e) => this.voteSelected(e) }>
              <FontAwesomeIcon icon={faThumbsUp} data-index={ index } />
              <FontAwesomeIcon icon={faThumbsDown} data-index={ index } />
            </div>
          </div>
        )
      });
    } else {
      return;
    }
  }

  render(){
    return(
      <div className="panel left main showPath"
        onDragOver={ (e) => this.onDragOver(e) }
        onDrop={ (e) => this.onDrop(e) }>
        <h2>Rendered Visualisations <span><input type="checkbox" onChange={ (e) => this.togglePath(e) } />Hide Path</span></h2>
        <p>Select which visualisations you like and which you don't, when you select you will be asked to briefly describe your reasoning behind your decision. Feel free to create as many or few visualisations as you like.</p>
        { this.renderMurvs() }
      </div>
    );
  }
}

export default Renderer;
