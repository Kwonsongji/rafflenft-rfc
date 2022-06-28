//import { initializeApp } from "firebase/app";

import firebase from "firebase";
import "firebase/firestore"; //BDD
import "firebase/auth" //Permet de nous connecter à un compte
// On va mettre les diff' info' pour que notre API se connect à notre fireBase

const firebaseConfig = {
  apiKey: "AIzaSyDPureAF5mGLojXstBES-JzZDHOcXhkuo4",
  authDomain: "nftwhitelist-44376.firebaseapp.com",
  projectId: "nftwhitelist-44376",
  storageBucket: "nftwhitelist-44376.appspot.com",
  messagingSenderId: "216472728694",
  appId: "1:216472728694:web:0cd2e05a872a5586545b57"
};

// on va initialiser l'api firebase aevc les infos qui sont içi dans la var' firebaseConfig
firebase.initializeApp(firebaseConfig);
export default firebase;