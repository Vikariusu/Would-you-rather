import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleSaveAnswer } from '../actions/questions';
import styled from 'styled-components';

import UnansweredQuestionOptions from './UnansweredQuestionOptions';
import AnsweredQuestionDisplay from './AnsweredQuestionDisplay';

const StyledQuestionPage = styled.div`
    width: 60vw;
    margin: 40px auto;
    background: white;
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
    color: #393E41;
    text-align: center;
    padding: 50px 20px;

    .question-author {
        display: flex;
        align-items: center;
        margin-bottom: 14px;

        img {
            margin-right: 6px;
        }
    }
`

class QuestionPage extends Component {
    handleVote = (answer) => {
        const qid = this.props.question.id;
        const authedUser = this.props.authedUser;

        this.props.dispatch(handleSaveAnswer({ authedUser, qid, answer }))
    }

    render() {
        const { question, author, isAnswered } = this.props;

        // App cannot find question so redirect page to 404 error
        if (!question) {
            return <Redirect to="/404" />;
        }

        return (
            <StyledQuestionPage>
                <div className="question">
                    <div className="question-author">
                        <img src={author ? author.avatarURL : ''} alt="" style={{ width: '30px' }} />
                        {author && author.name} asks:
                    </div>
                    <div>
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
            </StyledQuestionPage>
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
