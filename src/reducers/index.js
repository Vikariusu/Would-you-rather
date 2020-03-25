import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import questions from './questions';

// root reducer
export default combineReducers({
    authedUser,
    users,
    questions
})