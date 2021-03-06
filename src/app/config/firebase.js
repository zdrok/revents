import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJfr0VyKLD2a_w3PlGu5RWu89MwCA4rig",
  authDomain: "revents-udemy-3107d.firebaseapp.com",
  projectId: "revents-udemy-3107d",
  storageBucket: "revents-udemy-3107d.appspot.com",
  messagingSenderId: "314323835120",
  appId: "1:314323835120:web:bd69265057c72a957d8a35",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
