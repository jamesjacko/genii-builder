import React, {
  Component
} from "react";
import PropTypes from 'prop-types';
import SUSQuestion from './susQuestion';

class SurveySUS extends Component {
  constructor(props){
    super(props);
    this.state = {
      questions: []
    }
    this.setQuestion = this.setQuestion.bind(this);
  }

  setQuestion(index){
    this.setState({
      questions: this.state.questions.concat(index)
    })
  }

  static propTypes = {
    title: PropTypes.string.isRequired
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
    return ( <div className="sus">
      <p>Please fill out the following survey. This is in regards to the system you have used to design the visualisations. A survey about the visualisations will follow this.</p>
      { this.renderQuestions() }
      </div>
    )
  }
}

export default SurveySUS;
