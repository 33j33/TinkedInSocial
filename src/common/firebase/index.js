
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAtJTtHmUUw_3xaglLpK-YRWfZ_2N-cOVE",
    authDomain: "til-social-22075.firebaseapp.com",
    projectId: "til-social-22075",
    storageBucket: "til-social-22075.appspot.com",
    messagingSenderId: "1046381332394",
    appId: "1:1046381332394:web:8b4ec8453e9d5c28cc0dd3",
    measurementId: "G-BS9YLK6JJV"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };