import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import { getUsersAndQuestions } from './shared';

// Constants
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_ANSWER = 'SAVE_ANSWER';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleReceiveQuestions() {
    return (dispatch) => {
        return _getQuestions().then(questions => dispatch(receiveQuestions(questions)))
    };
}

export function handleAddQuestion(question) {
    return (dispatch) => {
        return _saveQuestion(question)
            .then(question => dispatch(addQuestion(question)))
    }
}

export function handleSaveAnswer({ authedUser, qid, answer }) {
    return (dispatch) => {
        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => dispatch(getUsersAndQuestions()))
    }
}
