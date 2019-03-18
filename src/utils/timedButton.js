import React, { Component } from 'react';

class TimedButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      end: new Date().getTime() + parseInt(this.props.duration || 300000),
      disabled: true
    }
  }

  getTime(duration){
    let seconds = (Math.floor((duration / 1000) % 60) + "").padStart(2, '0');
    let minutes = (Math.floor((duration / (1000 * 60)) % 60) + "").padStart(1, '0');
    return minutes + ":" + seconds;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
        if(this.state.end - new Date().getTime() > 0){
          let timeLeft = this.getTime(this.state.end - new Date().getTime());
          if(timeLeft === "0:00"){
            this.setState(
            {
              timeLeft: "0:00",
              disabled: false
            });
          } else {
            this.setState(
            {
              timeLeft: timeLeft
            })
          }
        }
      }
    , 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  clickHandler(event){
    event.preventDefault();
    this.props.actions.click();
    console.log(this.props + "here");
  }

  render(){
    console.log(this.props)
    return(
      <div className="timedButton">
        <span>{ this.state.timeLeft }</span><button disabled={this.state.disabled} id="timedButton" onClick={ (e) => this.clickHandler(e) }>{ this.props.text }</button>
      </div>
    )
  }
}

export default TimedButton;
