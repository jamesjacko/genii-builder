import React, { Component } from 'react';
import { Gene } from 'murv-component';
import { colors } from '../utils/colors.js';

class Property extends Component{
  // constructor(props){
  //   super(props);
  // }

  onDragStart(event, id){
    console.log('dragstart', id)
    event.dataTransfer.setData('id', JSON.stringify(id));
  }


  renderValues(){
    const values = Object.keys(Gene[this.props.value]).map((item, i) => {
      return(
        <li
        key={ this.props.value + i }
        style={ { borderColor: colors[i] } }
        draggable
        onDragStart={ (e) => this.onDragStart(e, {prop: this.props.value, value: i, item: item }) }
        >
          { item.toLowerCase() }
        </li>
      )
    });
    return values;
  }

  toggle(event){
    event.persist();
    if(event.clientY < event.target.offsetTop + 40)
      event.target.classList.toggle("closed");
  }

  render(){
    this.renderValues();
    return(
      <ul
      className="property closed"
      onClick={ this.toggle }
      data-name={ this.props.value }>
        { this.renderValues() }
      </ul>
    )
  }
}

export default Property;
