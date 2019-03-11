import React, { Component } from 'react';

class TimedButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      end: new Date().getTime() + (this.props.time || 300000),
    }
  }

  getTime(duration){
    let seconds = (Math.floor((duration / 1000) % 60) + "").padStart(2, '0');
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    return minutes + ":" + seconds;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
        this.setState(
        {
          timeLeft: this.state.end - new Date().getTime() > 0 ? this.getTime(this.state.end - new Date().getTime()) : ""
        })
        return true;
      }
    , 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    return(
      <div className="timedButton">
        <span>{ this.state.timeLeft }</span><button disabled>{ this.props.text }</button>
      </div>
    )
  }
}

export default TimedButton;
