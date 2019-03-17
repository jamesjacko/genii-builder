import React, { Component } from 'react';
import { Gene as MurvGene } from 'murv-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';

class Gene extends Component{
  openGene(event){
    event.preventDefault();
    let t = (event.target.localName === "li") ? event.target.parentElement : event.target;
    t.classList.toggle("open");
  }

  renderGene(){
    return Object.keys(this.props).map((item, i) => {
      if(Object.keys(this.props)[i] !== "actions"){
        MurvGene.config = {
          Dataset_1: 1,
          Dataset_2: 2,
          Dataset_3: 3
        };
        return(
          <li
            key={ i }
            data-value = { Object.values(this.props)[i].toLowerCase().replace("_", " ") }
            data-prop = { Object.keys(this.props)[i].toLowerCase() === "config"? "data" : Object.keys(this.props)[i].toLowerCase()}
            className={ "color" +
              MurvGene[Object.keys(this.props)[i]][Object.values(this.props)[i]] + " " + Object.keys(this.props)[i].toLowerCase() +
              (Object.keys(this.props)[i].toLowerCase() === "path_mode"? "" : " stylabale") }
            // style={ Object.keys(this.props)[i].toLowerCase() === "path_mode"? {} : { 'left' : "calc(" + ((i - 1) * 22) + "% + 27px)", zIndex : "2" } }
            >
            { Object.values(this.props)[i].toLowerCase() }
          </li>
        )
      }
      return "";
    })
  }

  onDragStart(event){
    event.dataTransfer.setData('gene', JSON.stringify(this.props));
  }

  removeGene(){
    this.props.actions.remove(this.props.actions.index);
  }

  removeCopyGene(){
    this.props.actions.copy(this.props.actions.index);
  }

  onDragOver(event){
    event.stopPropagation();
    event.preventDefault();
  }

  render(){
    return(
      <ul
        className="gene"
        draggable
        onDragStart={ (e) => this.onDragStart(e) }
        onDragOver={ (e) => this.onDragOver(e) }
        onClick={ (e) => this.openGene(e) }>
        { this.renderGene() }
        <FontAwesomeIcon icon={faTrash} onClick={ (e) => this.removeGene() } title="Remove Gene" />
        <FontAwesomeIcon icon={faCopy} onClick={ (e) => this.removeCopyGene() }  title="Copy Gene" />
      </ul>
    )
  }
}

export default Gene;
