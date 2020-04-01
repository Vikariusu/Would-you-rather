import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledQuestionCard = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid #D3D0CB;
    margin: 6px 0;
    border-radius: 6px;
    padding: 18px 24px;
    background: white;
    color: #393E41;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);

    h5 {
        margin: 0 0 6px 0;
    }
`

const StyledButton = styled.button`
    border: none;
    background: #D5A021;
    color: white;
    padding: 8px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 4px;
    letter-spacing: 0.6px;
    cursor: pointer;
`

function QuestionCard({ question, history }) {
    const toQuestion = (e, id) => {
        e.preventDefault();
        history.push(`/questions/${id}`)
    }

    return (
        <StyledQuestionCard key={question.id}>
            <div>
                <h5>Would you rather...</h5>
                <div>
                    <span>{question.optionOne.text}</span> OR <span>{question.optionTwo.text.slice(0, 7)}...</span>
                </div>
            </div>
            <StyledButton onClick={(e) => toQuestion(e, question.id)}>See the poll</StyledButton>
        </StyledQuestionCard>
    )
}

export default withRouter(QuestionCard);