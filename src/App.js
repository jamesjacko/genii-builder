import React, { Component } from 'react';
import './App.css';
import SurveyWelcome from './components/surveyWelcome.js';
import SurveyDesign from './components/surveyDesign.js';
import firebase, { sendData } from './utils/firebase.js';
import TimedButton from './utils/timedButton.js';
import {
  BrowserRouter,
  Route} from 'react-router-dom';

class App extends Component {
  buttonClick(){
    alert("Hello");
  }
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="App">
          <h1>Micro-Visualisation Designer
            <TimedButton text="Next" duration="300000" actions={ { click: this.buttonClick.bind(this) } } />
          </h1>
          <Route exact path="/" render={(props) => <SurveyWelcome { ...props } />} />
          <Route exact path="/design" render={(props) => <SurveyDesign { ...props } />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
