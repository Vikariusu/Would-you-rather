import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import checkmark from '../styles/checkmark.png'

const StyledDisplay = styled.div`
    div {
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 15px;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.5px;
        margin: 0 14px;
        background: white;
        border: 1px solid #44BBA4;
        color: #44BBA4;
    }

    span {
        margin-right: 8px;
    }

    .voted { 
        background: #44BBA4;
        color: white;
        position: relative;
    }

    img {
        position: absolute;
        width: 28px;
        top: -11px;
        right: -6px;
    }
`

function AnsweredQuestionDisplay({ question, authedUser }) {
    const userAnswer = question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo';
    const total = question.optionOne.votes.length + question.optionTwo.votes.length;
    const percentageA = Math.round(question.optionOne.votes.length / total * 100).toString();
    const percentageB = Math.round(question.optionTwo.votes.length / total * 100).toString();

    return (
        <StyledDisplay>
            <div className={userAnswer === 'optionOne' ? 'voted' : ''}>
                <span>{question.optionOne.text}</span>
                [ Votes: {question.optionOne.votes.length} ( {percentageA}% ) ]
                {userAnswer === 'optionOne' && <img src={checkmark} alt='' />}
            </div>
            <p>or</p>
            <div className={userAnswer === 'optionTwo' ? 'voted' : ''}>
                <span>{question.optionTwo.text}</span>
                [ Votes: {question.optionTwo.votes.length} ( {percentageB}% ) ]
                {userAnswer === 'optionTwo' && <img src={checkmark} alt='' />}
            </div>
        </StyledDisplay>
    )
}

function mapStateToProps({ authedUser }, { question }) {
    return {
        authedUser,
        question
    }
}

export default connect(mapStateToProps)(AnsweredQuestionDisplay);