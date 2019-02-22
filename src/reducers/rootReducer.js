import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';

export default combineReducers({
    form: formReducer,
    events: eventReducer,
    modals: modalReducer,
    auth: authReducer
});