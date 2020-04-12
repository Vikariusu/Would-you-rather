import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInitialData } from '../actions/shared';
import styled from 'styled-components';
import GlobalStyle from '../styles/global';

// components
import Nav from './Nav';
import MainPage from './MainPage';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import UserLogin from './UserLogin';
import NotFoundPage from './NotFoundPage';
import PrivateRoute from './PrivateRoute';

const StyledApp = styled.div`
    min-height: 100vh;
`
const Wrapper = styled.div`
  margin: 0 60px;
`

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(getInitialData())
  }

  render() {
    return (
      <StyledApp>
        <GlobalStyle />
        <Router>
          <Nav />
          <Wrapper>
            <Switch>
              <Route path="/login" component={UserLogin} />
              <PrivateRoute path="/" exact component={MainPage} />
              <PrivateRoute path="/add" component={NewQuestion} />
              <PrivateRoute path="/questions/:id" component={QuestionPage} />
              <PrivateRoute path="/leaderboard" component={LeaderBoard} />
              <Route component={NotFoundPage} />
            </Switch>
          </Wrapper>
        </Router>
      </StyledApp>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
