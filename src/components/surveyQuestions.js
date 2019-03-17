import React, { Component } from "react";

 class SurveyQuestions extends Component{

   constructor(props){
     super(props);
     this.state = {
       questions: {},
       key: window.localStorage.getItem('firebase_key')
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

   clickHandler(event){
     event.preventDefault();
   }

    renderQuestions(){
      return (this.questions.map((item, index) => {
        return(
          <div key={ "survey_" + index }>
            <p>{ item }:</p>
            <textarea data-id={ index } value={ this.state.questions[index] } onChange={(e) => this.textChanged(e, index)}/>
          </div>
        )
      }));
    }

   render(){
     console.log(this.state);
     return(
       <div className="survey">
         <h2>Please fill out the following survey questions.</h2>
         { this.renderQuestions() }
         <button onClick={ (e) => this.clickHandler(e) }>Continue</button>
        </div>
     )
   }
 }

 export default SurveyQuestions;
