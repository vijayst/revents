import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
    form: formReducer,
    events: eventReducer,
    modals: modalReducer,
    auth: authReducer,
    toastr: toastrReducer
});