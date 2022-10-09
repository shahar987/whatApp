import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDS5DUvUQTY35y1wh5wKOTSMQT-H1jv82s",
    authDomain: "whatup-3c3db.firebaseapp.com",
    projectId: "whatup-3c3db",
    storageBucket: "whatup-3c3db.appspot.com",
    messagingSenderId: "827313302041",
    appId: "1:827313302041:web:88e2289c77a0b57ae71888",
    measurementId: "G-YJXXD4D0T3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;