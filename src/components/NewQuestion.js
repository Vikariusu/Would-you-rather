import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import styled from 'styled-components';

const StyledNewQuestion = styled.div`
    width: 60vw;
    margin: 40px auto;
    background: white;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    color: #393E41;
    text-align: center;
    padding: 50px 20px;

    form {		
        input {
            width: 240px;
            background: #f5f6fa;
            color: #a3a3a3;
            font: inherit;
            border: 0;
            outline: 0;
            padding: 14px 10px;
        }

        span {
            margin: 0 14px;
            color: #777570;
        }
    }
`

const StyledButton = styled.button`
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.6px;
    border: none;
    margin: 14px 0;
    background: #D5A021;
    text-transform: uppercase;
    padding: 10px 12px;
    border-radius: 3px;
    color: white;
    cursor: pointer;
`

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
            <StyledNewQuestion>
                <h2>Ask a Question</h2>
                <h4>Would you rather...</h4>
                <form onSubmit={this.submitForm}>
                    <input
                        type="text"
                        onChange={(e) => this.handleInputChange(e, 'optionOne')}
                        value={this.state.optionOne}
                    />
                    <span>or</span>
                    <input
                        type="text"
                        onChange={(e) => this.handleInputChange(e, 'optionTwo')}
                        value={this.state.optionTwo}
                    />
                    <div>
                        <p>{this.state.errorMessage}</p>
                        <StyledButton type="submit">Submit</StyledButton>
                    </div>
                </form>
            </StyledNewQuestion>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion);