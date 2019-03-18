import React, { Component } from 'react';

class SurveyWelcome extends Component{
  clickHandler(event){
    event.preventDefault();
    this.props.history.push("/design");
  }
  render(){
    return(
      <div className="survey">
        <p>Welcome, Please watch this video before proceeding</p>
        <iframe width="780" height="439" src="https://www.youtube.com/embed/2Z29aL7nvsA?rel=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullscreen></iframe>
          <button onClick={ (e) => this.clickHandler(e) }>Continue</button>
      </div>
    )
  }
}

export default SurveyWelcome;
