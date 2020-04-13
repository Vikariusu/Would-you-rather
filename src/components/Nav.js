import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    height: 20px;
    .nav-right {
        display: flex;
    }

    .nav-user {
        span {
            margin-right: 6px;
        }
    }

    ul {
        list-style:none;
        position:relative;
        float:left;
        margin: -15px 0 0 0 ;
        padding:0;
           
        ul {
            display:none;
            position:absolute;
            top:130%;
            left:0;
            background:#fff;
            padding:0
        }

        li {
            position:relative;
            float:left;
            margin:0;
        }

        ul li {
            float:none;
            width:200px;
            box-shadow: 0 4px 4px rgba(0, 0, 0, 0.18);
        }
        
        li:hover > ul {
            display:block
        }

        button {
            display: flex;
            align-items: center;
            text-decoration:none;
            line-height: 50px;
            border: none;
            font-family: inherit;
            font-size: inherit;
            cursor: pointer;
            width: 100%;
        }
    }
`

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
            <StyledNav>
                <div className="nav-left">
                    <Link to="/">Homepage</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                </div>
                <div className="nav-right">
                    <Link to="/add">Add question</Link>
                    {authedUser && (
                        <ul>
                            <li>
                                <button className="nav-user">
                                    <span>Hello {firstName}</span>
                                    <img src={user && user.avatarURL} alt="" style={{ width: '30px' }} />
                                </button>
                                <ul>
                                    <li onClick={this.userLogout}><button>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                    )}
                </div>
            </StyledNav>
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