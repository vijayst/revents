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

export function register(formValues) {
    return async (dispatch, getState, getFirestore) => {
        try {
            const firestore = getFirestore();
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(
                    formValues.email,
                    formValues.password
                );
            await result.user.updateProfile({
                displayName: formValues.displayName
            });
            const userProfile = {
                displayName: formValues.displayName,
                createdAt: firestore.FieldValue.serverTimestamp()
            };
            await firestore.set(`users/${result.user.uid}`, userProfile);
            dispatch(closeModal());
        } catch (err) {
            console.log(err);
            throw new SubmissionError({ _error: err.message });
        }
    };
}

export function socialLogin(selectedProvider) {
    return async dispatch => {
        try {
            dispatch(closeModal());
            await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            });
        } catch (err) {
            console.log(err);
        }
    };
}
