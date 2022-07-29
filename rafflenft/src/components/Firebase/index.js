//import { initializeApp } from "firebase/app";

import firebase from "firebase";
import "firebase/firestore"; //BDD
import "firebase/auth" //Permet de nous connecter à un compte
// On va mettre les diff' info' pour que notre API se connect à notre fireBase

const firebaseConfig = {

  apiKey: "AIzaSyBeOZ3rMUIsKrd2RC-8thtU9fcxeIlRrlg",

  authDomain: "nft-whitelist-28bf1.firebaseapp.com",

  projectId: "nft-whitelist-28bf1",

  storageBucket: "nft-whitelist-28bf1.appspot.com",

  messagingSenderId: "736029417370",

  appId: "1:736029417370:web:addeb23e8990258370a423"

};




// on va initialiser l'api firebase aevc les infos qui sont içi dans la var' firebaseConfig
firebase.initializeApp(firebaseConfig);
export default firebase;