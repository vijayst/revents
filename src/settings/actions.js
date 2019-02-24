import firebase from '../common/firebase';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';

export function updateProfile(formValues) {
    return async () => {
        try {
            const { isEmpty, isLoaded, providerData, ...user } = formValues;
            await firebase.updateProfile(user);
            toastr.success('Success', 'Profile is updated');
        } catch (error) {
            console.log(error);
        }
    };
}

export function uploadProfileImage(file) {
    return async (dispatch, getState, getFirestore) => {
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`;
        const filename = cuid();
        const options = { name: filename };
        const firestore = getFirestore();
        try {
            const uploadedFile = await firebase.uploadFile(
                path,
                file,
                null,
                options
            );
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
            firestore
                .collection('users')
                .doc(user.uid)
                .update({
                    photos: firebase.firestore.FieldValue.arrayUnion({
                        name: filename,
                        url: downloadURL
                    })
                });
        } catch (error) {
            throw new Error('Error in uploading photo');
        }
    };
}

export function deletePhoto(name, url) {
    return async (dispatch, getState, getFirestore) => {
        const firestore = getFirestore();
        try {
            const user = firebase.auth().currentUser;
            await firebase.deleteFile(`${user.uid}/user_images/${name}`);
            const userDoc = await firestore
                .collection('users')
                .doc(user.uid)
                .get();
            const userDocPhoto = userDoc.data().photos.find(p => p.url === url);
            await firestore
                .collection('users')
                .doc(user.uid)
                .update({
                    photos: firebase.firestore.FieldValue.arrayRemove(
                        userDocPhoto
                    )
                });
        } catch (err) {
            throw new Error('Error in deleting photo');
        }
    };
}

