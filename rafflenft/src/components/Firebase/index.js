import firebase from "firebase";
import "firebase/firestore"; //BDD
import "firebase/auth" //Permet de nous connecter à un compte
// On va mettre les diff' info' pour que notre API se connect à notre fireBase

const firebaseConfig = {
  apiKey: "AIzaSyDrP3L5ZUPj6Vy6O45PmzpMTYbXm21eS-A",
  authDomain: "nftwhitelist-2319a.firebaseapp.com",
  projectId: "nftwhitelist-2319a",
  storageBucket: "nftwhitelist-2319a.appspot.com",
  messagingSenderId: "684439443657",
  appId: "1:684439443657:web:0c6b0535a994f898541518"
};

// on va initialiser l'api firebase aevc les infos qui sont içi dans la var' firebaseConfig
firebase.initializeApp(firebaseConfig);
export default firebase;