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

export function uploadProfileImage(file, filename) {
    return async (dispatch, getState, getFirestore) => {
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const options = { name: filename };
        const firestore = getFirestore();
        try {
            const uploadedFile = await firebase.uploadFile(path, file, null, options);
            const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            const userDoc = await firestore.get(`users/${user.uid}`);
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                });
            }
            firestore.collection('users').doc(user.uid).update({
                photos: firebase.firestore.FieldValue.arrayUnion({
                    name: filename,
                    url: downloadURL
                })
            });
        } catch(error) {
            console.log(error);
            throw new Error('Error in uploading photo');
        }
    }
}