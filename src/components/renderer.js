import React, { Component } from 'react';
import GENII, { Gene as GENIIGene } from 'genii-component';
import Config, { Config1, Config2 } from '../config.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getGeneKey, setGeneResponse } from '../utils/firebase.js';

class Renderer extends Component{

  constructor(props){
    super(props);
    this.state = {
      genes: [],
      key: window.localStorage.getItem('firebase_key'),
      count: 0
    }
  }

  onDrop(event){
    if(event.dataTransfer.getData('gene')){
      let data = JSON.parse(event.dataTransfer.getData('gene'));
      let customPath = data.customPath
      data = { gene: { ...data.values }, key: getGeneKey(this.state.key)}
      console.log(data)
      this.setState(prevState => ({
          genes: prevState.genes.concat(data),
          count: prevState.count + 1,
          customPath: customPath
      }));
    }
  }

  onDragOver(event){
    event.stopPropagation();
    event.preventDefault();
  }

  voteSelected(event){
    event.persist();
    if(event.target.localName === "svg"){
      if(event.target.classList.contains('fa-trash')){
        var arr = [...this.state.genes];
        arr.splice(event.target.getAttribute('data-index'), 1);
        this.setState(prevState => ({
          genes: arr,
          count: prevState.count + 1
        }));
      } else {
        for (var i = 0; i < event.target.parentElement.children.length; i++) {
          event.target.parentElement.children[i].classList.remove('selected');
        }
        event.target.classList.add('selected');
        let gene = this.state.genes[event.target.getAttribute('data-index')];
        setGeneResponse(this.state.key, gene.key, gene.gene, event.target.classList.contains('fa-thumbs-up'));
        var arr = [...this.state.genes];
        arr[event.target.getAttribute('data-index')].gene.liked = event.target.classList.contains('fa-thumbs-up');
        this.setState(prevState => ({
          genes: arr,
          count: prevState.count + 1
        }));
      }
    }
  }

  togglePath(event){
    document.querySelector('.main').classList.toggle('showPath', event.target.checked);
  }

  renderAGENII(newConfig, newItem, index){
    if(this.state.customPath != ""){
      return(
        <GENII config={ newConfig } gene={ new GENIIGene(newItem) } key={ index } path={ this.state.customPath } />
      )
    }
    return(
      <GENII config={ newConfig } gene={ new GENIIGene(newItem) } key={ index } />
    )
  }

  renderGENIIs(){
    if(this.state.genes.length > 0){

      const GENIIs = this.state.genes.map((item, index) => {


        let newItem = { ...item.gene };

        for (var i = 0; i < Object.values(newItem).length; i++) {
          if(Object.keys(newItem)[i].toLowerCase() !== "config" && Object.keys(newItem)[i] !== "actions" && Object.keys(newItem)[i] !== "liked")
            newItem[Object.keys(newItem)[i]] = GENIIGene[Object.keys(newItem)[i]][Object.values(newItem)[i]];
        }
        newItem.debugging = 2;
        let newConfig = Config;
        if(newItem.config){
          switch (newItem.config) {
            case "Dataset_2":
              newConfig = Config1;
              break;
            case "Dataset_3":
              newConfig = Config2;
              break;
            default:
              newConfig = Config
          }
        }
        console.log(newItem);
        return(
          <div className="vis" key={ "vis" + index }>
            { this.renderAGENII(newConfig, newItem, index) }
            
            <div className="overlay" onClick={ (e) => this.voteSelected(e) }>
              <FontAwesomeIcon icon={faThumbsUp} className={ newItem.liked? "selected" : "" } data-index={ index } />
              <FontAwesomeIcon icon={faThumbsDown} className={ (typeof newItem.liked !== "undefined" && !newItem.liked)? "selected" : "" } data-index={ index } />
              <FontAwesomeIcon icon={faTrash} data-index={ index } />
            </div>
          </div>
        )
      });
      return GENIIs;
    } else {
      return;
    }
  }

  render(){
    return(
      <div className="panel left main"
        onDragOver={ (e) => this.onDragOver(e) }
        onDrop={ (e) => this.onDrop(e) }
        key={ "renderer" + this.state.count }>
        <h2>Rendered Visualisations <span><input type="checkbox" onChange={ (e) => this.togglePath(e) } />Show Path</span></h2>
        <p>Select which visualisations you like and which you don't. You can remove any rendered visualisations whenever you like.</p>
        { this.renderGENIIs() }
      </div>
    );
  }
}

export default Renderer;
