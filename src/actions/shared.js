import { _getQuestions, _getUsers } from '../utils/_DATA';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { setAuthedUser } from './authedUser';

const AUTHED_ID = null;

export function getInitialData() {
    return (dispatch) => {
        dispatch(getUsersAndQuestions());
        dispatch(setAuthedUser(AUTHED_ID));
    }
}

export function getUsersAndQuestions() {
    return (dispatch) => {
        _getQuestions().then(questions => dispatch(receiveQuestions(questions)));
        _getUsers().then(users => dispatch(receiveUsers(users)));
    }
}