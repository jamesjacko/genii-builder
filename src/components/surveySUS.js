import React, {
  Component
} from "react";
import PropTypes from 'prop-types';
import SUSQuestion from './susQuestion';
import { setSurveyResponse } from '../utils/firebase.js';

class SurveySUS extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: {},
      key: window.localStorage.getItem('firebase_key')
    }
    this.setQuestion = this.setQuestion.bind(this);
  }

  setQuestion(index, value){
    let obj = {...this.state.questions};
    obj[index] = value;
    this.setState({
      questions: {...obj}
    });
  }

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  clickHandler(event){
    event.preventDefault();
    let total = 0;
    for (var i = 0; i < Object.keys(this.state.questions).length; i++) {
      if(i % 2 === 1){
        total += 5 - (parseInt(this.state.questions[i]) + 1);
      } else {
        total += parseInt(this.state.questions[i]);
      }
      console.log(typeof this.state.questions[i]);
    }
    let response = { ...this.state.questions }
    response.value = total * 2.5;
    setSurveyResponse(this.state.key, 'sus', response, this.susCallBack.bind(this));
  }

  susCallBack(error){
    if(error){

    } else {
      this.props.history.push('/survey');
    }
  }

  questions = [
    "I think that I would like to use this system frequently.",
    "I found the system unnecessarily complex.",
    "I thought the system was easy to use.",
    "I think that I would need the support of a technical person to be able to use this system.",
    "I found the various functions in this system were well integrated.",
    "I thought there was too much inconsistency in this system.",
    "I would imagine that most people would learn to use this system very quickly.",
    "I found the system very cumbersome to use.",
    "I felt very confident using the system.",
    "I needed to learn a lot of things before I could get going with this system."
  ];

  renderQuestions(){
    return this.questions.map((item, index) => (
      <SUSQuestion text={ item } index={ index } actions={ {setQuestion: this.setQuestion } } key={ "question_" + index } />
    ));
  }

  render() {
    console.log(this.state);
    return ( <div className="survey">
      <p>Please fill out the following survey. This is in regards to the system you have used to design the visualisations. A survey about the visualisations will follow this.</p>
      { this.renderQuestions() }
      <button disabled={Object.keys(this.state.questions).length !== this.questions.length} onClick={ (e) => this.clickHandler(e) }>Continue</button>
      </div>
    )
  }
}

export default SurveySUS;
