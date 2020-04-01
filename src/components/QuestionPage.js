import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { _saveQuestionAnswer } from '../utils/_DATA'; // TODO: move to actions
import { getUsersAndQuestions } from '../actions/shared';

import UnansweredQuestionOptions from './UnansweredQuestionOptions';
import AnsweredQuestionDisplay from './AnsweredQuestionDisplay';

class QuestionPage extends Component {
    handleVote = (answer) => {
        const qid = this.props.question.id;
        const authedUser = this.props.authedUser;

        _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => this.props.dispatch(getUsersAndQuestions()))
    }

    render() {
        const { question, author, isAnswered, authedUser } = this.props;

        if (!authedUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div>
                <div className="question">
                    <div className="question-author">
                        <img src={author ? author.avatarURL : ''} alt="" style={{ width: '30px' }} />
                        {author && author.name} asks:
                    </div>
                    <h2>Would you rather...</h2>
                    {isAnswered ? (
                        <AnsweredQuestionDisplay
                            question={question}
                        />
                    ) : (
                            <UnansweredQuestionOptions
                                question={question}
                                handleVote={this.handleVote}
                            />
                        )}
                </div>
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    const questionId = props.match.params.id;
    const question = questions[questionId];
    const author = question ? users[question.author] : '';
    const isAnswered = users[authedUser] ? users[authedUser].answers.hasOwnProperty(questionId) : null

    return {
        question,
        author,
        authedUser,
        isAnswered
    }
}

export default connect(mapStateToProps)(QuestionPage)
