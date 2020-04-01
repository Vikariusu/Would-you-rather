import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class UserLogin extends Component {
    state = {
        value: 'default'
    }

    setUser = (e) => {
        const newAuthedUser = e.target.value;
        const { history } = this.props;

        this.setState({ value: newAuthedUser })
        this.props.dispatch(setAuthedUser(newAuthedUser))
        history.push('/');
    }

    render() {
        return (
            <div>
                Log in:
                <form>
                    <select id="users" value={this.state.value} onChange={this.setUser}>
                        <option disabled value="default">Choose User</option>
                        <option value="sarahedo">sarahedo</option>
                        <option value="tylermcginnis">tylermcginnis</option>
                        <option value="johndoe">johndoe</option>
                    </select>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(UserLogin);