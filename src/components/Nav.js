import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    toggleAuthedUser = () => {
        const currentAuthedUser = 'sarahedo'; // temporary authed user

        if (!this.props.authedUser) {
            this.props.dispatch(setAuthedUser(currentAuthedUser))
        } else {
            this.props.dispatch(setAuthedUser(null))
        }
    }

    render() {
        const { authedUser, user } = this.props;
        const firstName = user && user.name.split(' ')[0].toString();

        return (
            <nav>
                <div className="nav-left">
                    <Link to="/">Homepage</Link>
                    <Link to="/scoreboard">Scoreboard</Link>
                </div>
                <div className="nav-right">
                    <Link to="/new">Add question</Link>
                    {authedUser && (
                        <div>
                            <span>Hello {firstName}</span>
                            <img src={user && user.avatarURL} style={{ width: '30px' }} />
                        </div>
                    )}
                    <button onClick={this.toggleAuthedUser}>
                        {authedUser ? 'Logout' : 'Login'}
                    </button>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users }) {
    return {
        authedUser,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Nav);