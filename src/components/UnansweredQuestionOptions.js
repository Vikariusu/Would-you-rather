import React from 'react';
import styled from 'styled-components';

const StyledOption = styled.button`
    border: none;
    background: #44BBA4;
    border-radius: 4px;
    padding: 10px 20px;
    color: white;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    width: 100%;
`

function UnansweredQuestionOptions({ question, handleVote }) {
    return (
        <div>
            <div>
                {question && <StyledOption onClick={(e) => {
                    e.preventDefault();
                    handleVote('optionOne');
                }}>{question.optionOne.text}</StyledOption>}
            </div>
            <p>or</p>
            <div>
                {question && <StyledOption onClick={(e) => {
                    e.preventDefault();
                    handleVote('optionTwo');
                }}>{question.optionTwo.text}</StyledOption>}
            </div>
        </div>
    )
}

export default UnansweredQuestionOptions;