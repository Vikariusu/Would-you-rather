import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        errorMessage: ''
    }

    handleInputChange = (e, option) => {
        // clears the error message when user changes input
        this.setState({ [option]: e.target.value, errorMessage: '' })
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({ errorMessage: '' })

        // sets the error if one of inputs is empty
        if (!this.state.optionOne || !this.state.optionTwo) {
            this.setState({ errorMessage: "Fields cannot be empty." })
            return;
        }

        const question = {
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
            author: this.props.authedUser
        }
        this.props.dispatch(handleAddQuestion(question))
            .then(() => this.props.history.push('/'))
    }

    render() {
        if (!this.props.authedUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div>
                <h2>Ask a Question</h2>
                <h4>Would you rather...</h4>
                <form onSubmit={this.submitForm}>
                    <input
                        type="text"
                        onChange={(e) => this.handleInputChange(e, 'optionOne')}
                        value={this.state.optionOne}
                    />
                    OR
                    <input
                        type="text"
                        onChange={(e) => this.handleInputChange(e, 'optionTwo')}
                        value={this.state.optionTwo}
                    />
                    <button type="submit">Submit</button>
                </form>
                {this.state.errorMessage}
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);