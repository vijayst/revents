import { LOGIN, LOGOUT } from "./constants";

export function login(credentials) {
    return {
        type: LOGIN,
        payload: {
            credentials
        }
    };
}

export function logout() {
    return {
        type: LOGOUT
    };
}