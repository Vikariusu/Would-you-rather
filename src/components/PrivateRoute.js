// This component is taken from Tyler Mcginnis' post on protected React routes with some modifications
// source: https://tylermcginnis.com/react-router-protected-routes-authentication/

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (
    <Route {...rest} render={(props) => (
        authedUser
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    )} />
)

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(PrivateRoute)

