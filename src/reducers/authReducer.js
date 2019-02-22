import { LOGIN, LOGOUT } from '../auth/constants';

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                loggedIn: true,
                currentUser: action.payload.credentials
            };
        case LOGOUT:
            return {
                loggedIn: false
            };
        default:
            return state;
    }
}
