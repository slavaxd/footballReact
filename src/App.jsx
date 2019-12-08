import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css';
import Table from './Table.js';
import Team from './Team.js';
import Predict from './Predict.js';


class App extends Component {
  setConfig = () => {
    return {
      APItoken: ['X-Auth-Token', 'b408c5c69ade430f8958d8b56b89c786' ]
    }
  }

  getRoutes = () => {
    return [
      ["/", Table]
      ["/team/:teamID", Team]
      ["/predict/:predictID", Predict]
    ]
  }
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">

          </header>
          {/*<Table />*/}
          {this.getRoutes().map(([path, Comp]) => {
            console.log(path, Comp)
            return (<Route path={path} component={React.createElement(Comp)} />)})}
          {/*<Route path="/match/:matchID" component={Match}/>*/}

        </div>
      </Router>
    );
  }
}

export default App;
