import React from 'react';

function UnansweredQuestionOptions({ question, handleVote }) {
    return (
        <div className="question-details">
            <div>
                {question && <button onClick={(e) => {
                    e.preventDefault();
                    handleVote('optionOne');
                }}>{question.optionOne.text}</button>}
            </div>
            OR
            <div>
                {question && <button onClick={(e) => {
                    e.preventDefault();
                    handleVote('optionTwo');
                }}>{question.optionTwo.text}</button>}
            </div>
        </div>
    )
}

export default UnansweredQuestionOptions;