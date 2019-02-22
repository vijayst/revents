import { toastr } from 'react-redux-toastr';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './constants';

export function createEvent(event) {
    return dispatch => {
        dispatch({
            type: CREATE_EVENT,
            payload: { event }
        });
        toastr.success('Success', 'Event is created');
    };
}

export function updateEvent(event) {
    return dispatch => {
        dispatch({
            type: UPDATE_EVENT,
            payload: { event }
        });
        toastr.success('Success', 'Event is updated');
    };
}

export function deleteEvent(eventId) {
    return {
        type: DELETE_EVENT,
        payload: { eventId }
    };
}
