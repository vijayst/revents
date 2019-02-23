import firebase from '../common/firebase';
import { toastr } from 'react-redux-toastr';

export function updateProfile(formValues) {
    return async () => {
        try {
            const { isEmpty, isLoaded, providerData, ...user } = formValues;
            await firebase.updateProfile(user);
            toastr.success('Success', 'Profile is updated');
        } catch(error) {
            console.log(error);

        }
    }
}