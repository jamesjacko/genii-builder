import React, { Component } from "react";
import { setSurveyResponse } from '../utils/firebase.js';

 class SurveyQuestions extends Component{

   constructor(props){
     super(props);
     this.state = {
       questions: {},
       key: window.localStorage.getItem('firebase_key'),
       sent: false
     }
   }

   questions = [
     "Describe how you would like to see these visualisations be used in day to day life",
     "Describe some aspects you liked about the visualisation design process",
     "Describe some aspects you disliked about the visualisation design process"
   ];

   textChanged(event, index){
     event.persist();
     this.setState(prevState => ({
       questions:{
         ...prevState.questions,
         [index]: event.target.value
       }
     }))
   }

   surveyCallBack(){
     this.setState({
       sent:true
     });
   }

   clickHandler(event){
     event.preventDefault();
     setSurveyResponse(this.state.key, 'survey', this.state.questions, this.surveyCallBack.bind(this));
   }

    renderQuestions(){
      return (this.questions.map((item, index) => {
        return(
          <div key={ "survey_" + index }>
            <p className="bold">{ item }:</p>
            <textarea data-id={ index } value={ this.state.questions[index] } onChange={(e) => this.textChanged(e, index)}/>
          </div>
        )
      }));
    }

   render(){
     console.log(this.state);
     if(!this.state.sent){
       return(
         <div className="survey">
           <p>Please fill out the following survey questions.</p>
           { this.renderQuestions() }
           <button onClick={ (e) => this.clickHandler(e) }>Continue</button>
          </div>
       )
     } else {
       return(
         <div className="survey">
           <p>Thank you for taking the time to take the survey.</p>
          </div>
       )
     }
   }
 }

 export default SurveyQuestions;
