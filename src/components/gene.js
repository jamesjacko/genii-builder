import React, { Component } from 'react';
import { Gene as GENIIGene } from 'genii-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';

class Gene extends Component{
  openGene(event){
    event.preventDefault();
    let t = (event.target.localName === "li") ? event.target.parentElement : event.target;
    t.classList.toggle("open");
  }

  renderGene(){
    return Object.keys(this.props.values).map((item, i) => {
      if(Object.keys(this.props.values)[i] !== "actions"){
        GENIIGene.config = {
          Dataset_1: 1,
          Dataset_2: 2,
          Dataset_3: 3
        };
        return(
          <li
            key={ i }
            data-value = { Object.values(this.props.values)[i].toLowerCase().replace("_", " ") }
            data-prop = { Object.keys(this.props.values)[i].toLowerCase() === "config"? "data" : Object.keys(this.props.values)[i].toLowerCase()}
            className={ "color" + 
              (typeof GENIIGene[Object.keys(this.props.values)[i]][Object.values(this.props.values)[i]] === "undefined" ? "7" : GENIIGene[Object.keys(this.props.values)[i]][Object.values(this.props.values)[i]]) + " " + Object.keys(this.props.values)[i].toLowerCase() +
              (Object.keys(this.props.values)[i].toLowerCase() === "path_mode"? "" : " stylabale") }
            // style={ Object.keys(this.props.values)[i].toLowerCase() === "path_mode"? {} : { 'left' : "calc(" + ((i - 1) * 22) + "% + 27px)", zIndex : "2" } }
            >
            { Object.values(this.props.values)[i].toLowerCase() }
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
    this.props.values.actions.remove(this.props.values.actions.index);
  }

  removeCopyGene(){
    this.props.values.actions.copy(this.props.values.actions.index);
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
