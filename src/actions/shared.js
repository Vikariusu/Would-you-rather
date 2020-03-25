import { _getQuestions, _getUsers } from '../utils/_DATA';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';
import { setAuthedUser } from './authedUser';

const AUTHED_ID = 'sarahedo'; // temporary authenticated user

export default function getInitialData() {
    return (dispatch) => {
        _getQuestions().then(questions => dispatch(receiveQuestions(questions)));
        _getUsers().then(users => dispatch(receiveUsers(users)));
        dispatch(setAuthedUser(AUTHED_ID));
    }
}