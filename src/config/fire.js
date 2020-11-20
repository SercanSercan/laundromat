import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let config = {
    apiKey: "",
    authDomain: "laundrybookings-513f9.firebaseapp.com",
    databaseURL: "https://laundrybookings-513f9.firebaseio.com",
    projectId: "laundrybookings-513f9",
    storageBucket: "laundrybookings-513f9.appspot.com",
    messagingSenderId: "682783598849"
};
let fire = firebase.initializeApp(config);

export default fire;