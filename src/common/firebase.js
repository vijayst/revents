import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "revents-clone.firebaseapp.com",
    databaseURL: "https://revents-clone.firebaseio.com",
    projectId: "revents-clone",
    storageBucket: "revents-clone.appspot.com",
    messagingSenderId: "130158711215"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;