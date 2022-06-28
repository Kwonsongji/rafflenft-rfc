import React, { useState, useEffect } from 'react';
// désigne la réf de la BDD car içi, je vais faire le traitement de la persone qui veut aller sur la whitelist
import { ref } from '../App'
// uuid pour générer des id automatiquement :
import { v4 as uuidv4 } from 'uuid';

// on va lui passer des props parce qu'on veut lui passer des éléments
// go main App, import et on lui passe plus'state qui permettra au composant de fonctioner
// on va ajouter un button avec comme classe btn, et l'event Onclick
// createDoc est une funct qui permet de créer un doc' dans la BDD
// et donc finalement par extension de rajouter un élemt dans la BDD
//on vas créer le doc à partir de quelle infos ? 
// à partir de l'address que l'user vas nous renseigner 
// on a besoins d'un id unique pour pouvoir le sélectioner si on veut le delete/modifier
const AddWhiteList = (props) => {
    // il nous faut une fonction qui nous permet de rajouter un élem' dans la BDD
    function createDoc(newDataObj) {
      // refresh number de pers' dans la liste
      props.getCount();
      // testons si l'add' eth est valide 
      if (newDataObj.address.match(/^0x[a-fA-F0-9]{40}$/)) {
        // vérifions si la whitelist n'est pas inférieur à 
        if (props.countData < 5) {
          // vérifions si l'addr' est déjà dans la BDD
          let i = 0;
          // on compte dans la BDD tout les élem' dont l'add' est égale 
          // à l'addr' transmise au clicquage du bouton 
          ref.where("address", "==", newDataObj.address)
            .get()
            .then(function (querySnapShot) {
              // pour chaque addr' ident' qu'on essaye de mettre dans whit
              // on va venir incrémenté la var i, elle devra rester = à 0
              // sinon il y aura déjà dans notre BDD
              querySnapShot.forEach(function (doc) {
                i++;
              })
              if (i < 1) {
                if (props.balance >= 0.6) {
                  ref.doc(newDataObj.id).set(newDataObj)
                    .then(result => {
                      props.setSuccess('You have been added to the whitelist !');
                      props.setError('');
                    })
                    .catch((err) => {
                      props.setSuccess('');
                      props.setError('Error, we are sorry .');
                    })
                }
                else {
                  props.setSuccess('');
                  props.setError('Not enough founds on your wallet (0.6 minimum)');
                }
              }
              else {
                props.setSuccess('');
                props.setError('This addr is already on the whitelist !');
              }
            })
            .catch(function (error) {
              props.setSuccess('');
              props.setError('Don\'t get the address ');
            }); 
        }
        else {
          props.setSuccess('');
          props.setError('Whitelist max limit exeded. ');
        }
      }
      else {
        props.setSuccess('');
        props.setError('Invalid address');
      }
      // mettons à jour le getCount 
      // ajoutons le setTimeOut car la méth' getCount n'aura pas
      // le temps de se mettre en place
      setTimeout(props.getCount, 500)
    }
  return (
  
    <div>
      <button className='btn' onClick={() => {
        createDoc({ address: props.accounts[0],
                    id: uuidv4(), 
                    balance: props.balance
                  })
      }}>
        Go on Whitelist 
      </button>
    </div>
  )
}

export default  AddWhiteList