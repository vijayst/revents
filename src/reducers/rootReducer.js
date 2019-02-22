import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
    form: formReducer,
    events: eventReducer,
    modals: modalReducer,
    auth: authReducer,
    toastr: toastrReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});