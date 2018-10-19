import React, { Component } from 'react';

import HomePage from '../../pages/HomePage';
import HistoryPage from '../../pages/HistoryPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={HomePage}
            />
            <Route
              exact
              path="/history"
              component={HistoryPage}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
