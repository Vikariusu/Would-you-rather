import React from 'react';
import QuestionCard from './QuestionCard';

function QuestionList({ questions, text }) {
    return (
        <div>
            <h2>{text}</h2>
            {questions.map(question => (
                <QuestionCard key={question.id} question={question} />
            ))}
        </div>
    )
}

export default QuestionList;