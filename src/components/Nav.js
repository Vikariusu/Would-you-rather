import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
    userLogout = () => {
        this.props.dispatch(setAuthedUser(null))
        this.redirectToHome();
    }

    redirectToHome = () => {
        const { history } = this.props;
        if (history) history.push('/');
    }

    render() {
        const { authedUser, user } = this.props;
        const firstName = user && user.name.split(' ')[0].toString();

        return (
            <nav>
                <div className="nav-left">
                    <Link to="/">Homepage</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                </div>
                <div className="nav-right">
                    <Link to="/add">Add question</Link>
                    {authedUser && (
                        <div>
                            <span>Hello {firstName}</span>
                            <img src={user && user.avatarURL} alt="" style={{ width: '30px' }} />
                        </div>
                    )}
                    {authedUser && (
                        <button onClick={this.userLogout}>Logout</button>
                    )}
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

export default connect(mapStateToProps)(withRouter(Nav));