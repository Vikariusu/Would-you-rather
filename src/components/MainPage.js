import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import QuestionList from './QuestionList';

const StyledMainpage = styled.div`
    width: 60vw;
    margin: 0 auto;
`

const StyledQuestionOptions = styled.div`
    text-align: center;
    
    button {
        display: inline-block;
        padding: 10px;
        border: none;
        text-transform: uppercase;
        margin: 0 6px; 
        border-radius: 3px;
        font-size: 14px;
        letter-spacing: 0.6px;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
        cursor: pointer;
   }

   .active {
        background: #44BBA4;
        color: white; 
    }  
`

class MainPage extends Component {
    state = {
        optionChosen: 'unanswered'
    }

    changeOption = (optionChosen) => {
        this.setState({ optionChosen })
    }

    render() {
        if (!this.props.authedUser) {
            return <Redirect to="/login" />;
        }

        return (
            <StyledMainpage>
                <StyledQuestionOptions>
                    <button
                        onClick={() => this.changeOption('unanswered')}
                        className={this.state.optionChosen === 'unanswered' ? 'active' : ''}
                    >
                        Unanswered
                    </button>
                    <button
                        onClick={() => this.changeOption('answered')}
                        className={this.state.optionChosen === 'answered' ? 'active' : ''}
                    >
                        Answered
                    </button>
                </StyledQuestionOptions>
                {this.state.optionChosen === 'unanswered'
                    ? (<QuestionList
                        questions={this.props.unansweredQuestions}
                        text="Unanswered Questions"
                    />)
                    : (
                        <QuestionList
                            questions={this.props.answeredQuestions}
                            text="Answered Questions"
                        />
                    )
                }
            </StyledMainpage>
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
        unansweredQuestions: sortByTimestamp(unansweredQuestions),
        authedUser
    }
}

export default connect(mapStateToProp)(MainPage);