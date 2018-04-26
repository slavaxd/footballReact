import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Table from './Table.js';
import Team from './Team.js';
import Predict from './Predict.js';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/*<header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title"><a href="/">Welcome to React</a></h1>
          </header>*/}
          {/*<Table />*/}
          <Route exact path="/" component={Table}/>
          <Route path="/team/:teamID" component={Team}/>
          <Route path="/predict/:predictID" component={Predict}/>
          {/*<Route path="/match/:matchID" component={Match}/>*/}

        </div>
      </Router>
    );
  }
}

export default App;
