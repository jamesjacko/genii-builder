import React, { Component } from 'react';
import { Gene } from 'murv-component';
import { colors } from '../utils/colors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

class Property extends Component{

  onDragStart(event, id){
    event.persist();
    event.stopPropagation();
    event.dataTransfer.setData('id', JSON.stringify(id));
  }


  renderValues(){
    const dontDisplay = [
      "WHITE",
      "WIN_LOSS"
    ]
    const values = Object.keys(Gene[this.props.value]).map((item, i) => {
      if(!dontDisplay.includes(item)){
        return(
          <li
          key={ this.props.value + i }
          style={ { borderLeftColor: colors[i] } }
          draggable
          onDragStart={ (e) => this.onDragStart(e, {prop: this.props.value, value: i, item: item, mode: 1 }) }
          >
            { (item === "I_RADIAL")? "Inverse Radial" : item.toLowerCase().replace("_", " ") }
          </li>
        )
      } else {
        return "";
      }
    });
    return values;
  }

  toggle(event){
    event.persist();
    for (var i = 0; i < document.querySelectorAll('.prop').length; i++) {
      if(document.querySelectorAll('.prop')[i] !== event.target.parentElement)
        document.querySelectorAll('.prop')[i].classList.add('closed');
    }
    event.target.parentElement.classList.toggle("closed");
  }

  render(){
    this.renderValues();
    return(
      <div className="prop closed">
        <FontAwesomeIcon icon={faChevronCircleDown} onClick={ this.toggle } />
        <FontAwesomeIcon icon={faChevronCircleUp} onClick={ this.toggle } />
        <ul
        className="property"
        data-name={ this.props.value.replace("_", " ") }>
          { this.renderValues() }
        </ul>
      </div>
    )
  }
}

export default Property;
