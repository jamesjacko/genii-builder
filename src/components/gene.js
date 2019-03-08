import React, { Component } from 'react';
import { Gene as MurvGene } from 'murv-component';

class Gene extends Component{
  openGene(event){
    event.preventDefault();
    let t = (event.target.localName === "li") ? event.target.parentElement : event.target;
    t.classList.toggle("open");
  }

  renderGene(){
    return Object.keys(this.props).map((item, i) => {
      return(
        <li
          key={ i }
          data-prop = { Object.values(this.props)[i].toLowerCase() }
          className={ "color" +
            MurvGene[Object.keys(this.props)[i]][Object.values(this.props)[i]] + " " + Object.keys(this.props)[i].toLowerCase() }
          style={ Object.keys(this.props)[i].toLowerCase() === "path_mode"? {} : { 'left' : "calc(" + ((i - 1) * 20) + "% + 10px)", zIndex : "2" } }
          >
          { Object.values(this.props)[i].toLowerCase() }
        </li>
      )
    })
  }

  onDragStart(event){
    event.dataTransfer.setData('gene', JSON.stringify(this.props));
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
      </ul>
    )
  }
}

export default Gene;
