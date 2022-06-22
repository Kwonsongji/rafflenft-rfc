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
const   AddWhiteList = (props) => {
  return (
    <div>
      <button className='btn' onClick={() => {
        createDoc({ address: props.account[0],
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