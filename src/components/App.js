import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInitialData } from '../actions/shared';

import Nav from './Nav';
import MainPage from './MainPage';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialData())
  }

  render() {
    return (
      <Router>
        <Nav />
        <Route path="/" exact component={MainPage} />
        <Route path="/questions/:id" component={QuestionPage} />
        <Route path="/add" component={NewQuestion} />
        <Route path="/leaderboard" component={LeaderBoard} />
      </Router>
    );
  }
}

export default connect()(App);
