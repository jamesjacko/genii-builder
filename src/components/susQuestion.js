import React, { Component } from "react";

 class SUSQuestion extends Component{
   constructor(props){
     super(props);
     this.state = {
       interacted: false
     }
     this.clickHandler = this.clickHandler.bind(this);
   }

   clickHandler(event){
     if(!this.state.interacted){
       this.setState({
         interacted: true
       });
       this.props.actions.setQuestion(this.props.index);
     }
   }

   renderCheckboxes(){
     let rads = [];
     for (var i = 0; i < 5; i++) {
       rads.push(<input type="radio"
         name={ "question_" + this.props.index }
         data-value={ i }
         value={ i }
         key={ this.props.index + "_" + i }
         onClick={ (e) => this.clickHandler(e) }
        />);
     }
     return <div className="sus-question">{ rads }</div>;
   }

   render(){
     return(
       <div>
         <p className="bold">{ this.props.index + 1 }: { this.props.text }</p>
         { this.renderCheckboxes() }
       </div>
     )
   }
 }

 export default SUSQuestion;
