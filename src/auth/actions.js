import { LOGIN, LOGOUT } from './constants';
import { closeModal } from '../modals/actions';

export function login(credentials) {
    return dispatch => {
        dispatch({
            type: LOGIN,
            payload: {
                credentials
            }
        });
        dispatch(closeModal());
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}
