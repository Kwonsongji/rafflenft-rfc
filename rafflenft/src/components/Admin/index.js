import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // car on veut gérer l'id
// on veut mettre des choses dans la BDD 
import firebase from '../Firebase';
import { ref } from '../App';// nous permet d'acceder 


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
// lorsque l'user va changer la valeur dans le champs de type email,
// cela va se répercuter sur le state email
// au click du button, on vas lancer une fonction qui va nous permettre de se logger
  function loggin() {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLogged(true);
        console.log('oui');
      })
      .catch((error) => {
        console.log('non');
      })
  }

  return (
    <div>
      {!logged
        ?
        <div>
          <h1> Se logger à l'interface d'administration</h1>
          <input type="email" onChange={e => setEmail(e.target.value)}/>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <button onClick={loggin}>Connexion</button>
        </div>
        :
        <div> Les outils d'administrations</div>
    
    }
    </div>
    
  )
}

export default Admin