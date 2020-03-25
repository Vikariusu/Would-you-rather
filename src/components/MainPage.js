import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainPage extends Component {
    toQuestion = (e, id) => {
        e.preventDefault();
        this.props.history.push(`/questions/${id}`)
    }

    render() {
        return (
            <div>
                <h2>Unaswered</h2>
                <ul>
                    {this.props.unansweredQuestions.map(question => (
                        <li>
                            <div>Would you rather...</div>
                            <div>
                                <span>{question.optionOne.text}</span> OR <span>{question.optionTwo.text}</span>
                            </div>
                            <button onClick={this.toQuestion}>Vote</button>
                        </li>
                    ))}
                </ul>

                <h2>Answered</h2>
                <ul>
                    {this.props.answeredQuestions.map(question => (
                        <li>
                            <div>Would you rather...</div>
                            <div>
                                <span>{question.optionOne.text}</span> OR <span>{question.optionTwo.text}</span>
                            </div>
                            <button onClick={(e) => this.toQuestion(e, question.id)}>Vote</button>
                        </li>
                    ))}
                </ul>

            </div>


        )
    }
}

function sortByTimestamp(questions) {
    return questions.sort((a, b) => b.timestamp - a.timestamp)
}

function mapStateToProp({ questions, users, authedUser }) {
    const answeredQuestionsIds = users[authedUser]
        ? Object.keys(users[authedUser].answers)
        : [];
    const unansweredQuestionIds = Object.keys(questions).filter(questionId => !answeredQuestionsIds.includes(questionId))

    const answeredQuestions = answeredQuestionsIds.map(questionId => questions[questionId])
    const unansweredQuestions = unansweredQuestionIds.map(questionId => questions[questionId])

    return {
        answeredQuestions: sortByTimestamp(answeredQuestions),
        unansweredQuestions: sortByTimestamp(unansweredQuestions)
    }
}

export default connect(mapStateToProp)(MainPage);