import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // car on veut gérer l'id
// on veut mettre des choses dans la BDD 
import firebase from '../Firebase';
import { ref } from '../App';// nous permet d'acceder 


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [data, setData] = useState([]);
// on va mettre ce state pour savoir si on a bien recupérer les données
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [data])

// lorsque l'user va changer la valeur dans le champs de type email,
// cela va se répercuter sur le state email
// au click du button, on vas lancer une fonction qui va nous permettre de se logger
//userCredential : identifiants d'utilisateurs
  
  function loggin() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLogged(true);
        getData();
        console.log('oui');
      })
      .catch((error) => {
        console.log('non');
      })
  }

  //on créer une fonct' pour pouvoir puiser dans les données de la BDD
  // 2) on va créer un tableau et à chaque fois qu'on créer une donnée en BDD
  // 3) on va rajouter cette donnée doc.data dans l'array
  // 4) on met le state à jour
  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      // 2)
      querySnapshot.forEach((doc) => {
        items.push(doc.data()) // 3)
      })
      setData(items); // 4)

    })
  }
   function deleteAddress (e) {
    //on récupère l'el grâce à e.target.value
    ref.doc(e.target.value).delete()

  } 

  return (
    <div>
      {!logged
        ?
        <div>
          <h1 className="signIn__title"> Log in Admin </h1>
          <input className="signIn__email" type="email" onChange={e => setEmail(e.target.value)} placeholder="enter an email"/>
          <input className="signIn__password" type="password" onChange={e => setPassword(e.target.value)} placeholder="enter an password"/>
          <button onClick={loggin}>Connexion</button>
        </div>
        :
        <div>
          Listing of accounts of WhiteList
          {loaded &&
            data.map(element => {
              return <li key={element.id} >{element.address} - {element.balance}
              - <button value={element.id}  onClick={deleteAddress} > Delete </button>
              </li>
            } )
          }
        </div>
    
    }
    </div>
    
  )
}

export default Admin