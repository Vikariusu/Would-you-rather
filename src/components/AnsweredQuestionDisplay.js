import React from 'react';
import { connect } from 'react-redux';

function AnsweredQuestionDisplay({ question, authedUser }) {
    const userAnswer = question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo'

    return (
        <div>
            <div>Votes: {question.optionOne.votes.length} {userAnswer === 'optionOne' && 'Your vote'}</div>
            <div>OR</div>
            <div>Votes: {question.optionTwo.votes.length} {userAnswer === 'optionTwo' && 'Your vote'}</div>
        </div>
    )
}

function mapStateToProps({ authedUser }, { question }) {
    return {
        authedUser,
        question
    }
}

export default connect(mapStateToProps)(AnsweredQuestionDisplay);