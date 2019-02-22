import { closeModal } from '../modals/actions';
import firebase from '../common/firebase';
import { SubmissionError } from 'redux-form';

export function login(credentials) {
    return async dispatch => {
        try {
            const { email, password } = credentials;
            await firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(closeModal());
        } catch (err) {
            console.log(err);
            throw new SubmissionError({ _error: err.message });
        }
    };
}

export function logout() {
    return dispatch => {
        firebase.auth().signOut();
    };
}
