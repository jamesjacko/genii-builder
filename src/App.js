import React, { Component } from 'react';
import './App.css';
import SurveyWelcome from './components/surveyWelcome';
import SurveyDesign from './components/surveyDesign';
import SurveySUS from './components/surveySUS';
import SurveyQuestions from './components/surveyQuestions';
import Results from './components/results';
import TimedButton from './utils/timedButton';
import {
  BrowserRouter,
  Route} from 'react-router-dom';

class App extends Component {
  buttonClick(props){
    props.history.push("/sus");
  }
  render() {

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <h1>GENII Designer
            <Route exact path="/design" render={ (props) => <TimedButton { ...{
                text: "Next",
                duration: "300000",
                actions:{
                  click: () => this.buttonClick(props)
                }
            } } /> } />
          </h1>
          <Route exact path="/" render={(props) => <SurveyDesign { ...props } />} />
          <Route exact path="/sus" render={(props) => <SurveySUS { ...props } title="System Usability Scale" />} />
          <Route exact path="/survey" render={(props) => <SurveyQuestions { ...props } />} />
          <Route exact path="/results" render={(props) => <Results { ...props } />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
