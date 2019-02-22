import { closeModal } from '../modals/actions';
import firebase from '../common/firebase';
import { SubmissionError, reset } from 'redux-form';
import { toastr } from 'react-redux-toastr';

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
    return async (dispatch, getState, getFirestore) => {
        try {
            dispatch(closeModal());
            const user = await firebase.login({
                provider: selectedProvider,
                type: 'popup'
            });
            if (user.additionalUserInfo.isNewUser) {
                const firestore = getFirestore();
                const userProfile = {
                    displayName: user.profile.displayName,
                    photoURL: user.profile.avatarUrl,
                    createdAt: firestore.FieldValue.serverTimestamp()
                };
                await firestore.set(`users/${user.user.uid}`, userProfile);
            }
        } catch (err) {
            console.log(err);
        }
    };
}

export function changePassword(formValues) {
    return async dispatch => {
        try {
            const user = firebase.auth().currentUser;
            await user.updatePassword(formValues.newPassword1);
            await dispatch(reset('account'));
            toastr.success('Success', 'Your password is updated');
        } catch(error) {
            throw new SubmissionError({ _error: error.message });
        }
    }
}