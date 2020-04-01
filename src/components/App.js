import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInitialData } from '../actions/shared';

// components
import Nav from './Nav';
import MainPage from './MainPage';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import UserLogin from './UserLogin';
import NotFoundPage from './NotFoundPage';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialData())
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/login" component={UserLogin} />
          <Route path="/" exact component={MainPage} />
          <Route path="/add" component={NewQuestion} />
          <Route path="/questions/:id" component={QuestionPage} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
