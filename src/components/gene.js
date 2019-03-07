import React, { Component } from 'react';
import { Gene as MurvGene } from 'murv-component';

class Gene extends Component{
  constructor(props){
    super(props);
    this.state = {
      path_mode: -1,
      shape: -1,
      color: -1,
      path_points: -1,
      object_size: -1
    };
  }

  componentDidMount(){
    this.renderGene();
  }

  openGene(event){
    event.preventDefault();
    event.target.classList.toggle("open");
  }

  renderGene(){
    return Object.keys(this.state).map((item, i) => {
      if(Object.values(this.state)[i] !== -1){
        return(
          <li
            key={ i }
            className={ "color" +
              MurvGene[Object.keys(this.state)[i]][Object.values(this.state)[i]] }
            >
            { Object.values(this.state)[i].toLowerCase() }
          </li>
        )
      } else {
        return;
      }
    })
  }

  onDragStart(event){
    event.dataTransfer.setData('gene', JSON.stringify(this.state));
  }

  onDrop(event){
    event.persist();
    let data = JSON.parse(event.dataTransfer.getData('id'));
    this.setState({
        [data.prop]: data.item
    });
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
        onDrop={ (e) => this.onDrop(e) }
        onClick={ (e) => this.openGene(e) }>
        { this.renderGene() }
      </ul>
    )
  }
}

export default Gene;
