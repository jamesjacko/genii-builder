import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

class Data extends Component{

  constructor(props){
    super(props);
    this.state = {
      data:[
        "Dataset_1",
        "Dataset_2",
        "Dataset_3"
      ]
    }
  }

  renderValues(){
    return this.state.data.map((item, i) => {
      return(
        <li
          key={ "config" + i }
          className={ "color" + (i + 1) }
          draggable
          onDragStart={ (e) => this.onDragStart(e, i) }>{item.replace("_", " ")}</li>
      )
    });
  }

  onDragStart(event, id){
    event.persist();
    event.stopPropagation();
    let toSend = {
      "prop": "config",
      "item": this.state.data[id],
      "value": id,
      "mode": 1
    }
    event.dataTransfer.setData('id', JSON.stringify(toSend));
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
    return(
      <div className="prop closed">
        <FontAwesomeIcon icon={faChevronCircleDown} onClick={ this.toggle } />
        <FontAwesomeIcon icon={faChevronCircleUp} onClick={ this.toggle } />
        <ul
          data-name="dataset"
          className="property">
          { this.renderValues() }
        </ul>
      </div>
    )
  }
}

export default Data
