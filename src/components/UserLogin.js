import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const StyledUserLogin = styled.div`
    width: 60vw;
    margin: 60px auto;
    padding: 40px 20px;
    background: white;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    color: #393E41;

    h2 {
        margin: 0;
        text-align: center;
        padding-bottom: 24px;
    }
`

const StyledDropdown = styled.div`
    margin: 0 auto;
    position: relative;
    display: flex;
    width: 20em;
    height: 3em;
    line-height: 3;
    background: #DCDDE1;
    overflow: hidden;
    border-radius: .25em;

    select {   
        -webkit-appearance: none;
        -moz-appearance: none;
        -ms-appearance: none;
        appearance: none;
        outline: 0;
        box-shadow: none;
        border: 0 !important;
        background: #DCDDE1;
        background-image: none;
        font-size: 18px;
        flex: 1;
        padding: 0 .5em;
        color: #4c5c65;
        cursor: pointer;
    }

    /* Remove IE arrow */
    select::-ms-expand {
        display: none;
    }

    &:hover::after {
        color: #393E41;
    }

    &::after {
        content: '\\25BC';
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 1em;
        background: #DCDDE1;
        cursor: pointer;
        pointer-events: none;
        -webkit-transition: .25s all ease;
        -o-transition: .25s all ease;
        transition: .25s all ease;    
    }
`

class UserLogin extends Component {
    state = {
        redirectToReferrer: false,
        value: 'default'
    }

    // sets the authedUser
    setUser = (e) => {
        const newAuthedUser = e.target.value;

        this.setState(() => ({
            redirectToReferrer: true,
            value: newAuthedUser
        }))

        this.props.dispatch(setAuthedUser(newAuthedUser))
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        // redirects to the page user tried to access before logging in
        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <StyledUserLogin>
                <h2>Log in</h2>
                <StyledDropdown>
                    <select id="users" value={this.state.value} onChange={this.setUser}>
                        <option disabled value="default">Choose a user</option>
                        {Object.keys(this.props.users).map(user => (
                            <option value={user} key={user}>{user}</option>

                        ))}
                    </select>
                </StyledDropdown>
            </StyledUserLogin>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}

export default connect(mapStateToProps)(UserLogin);