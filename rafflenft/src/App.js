/* import logo from './logo.svg'; */
import { useState, useEffect } from 'react';
// la librairie ethers et le fichier ERC721Merkle.dbg.json sont indispensables pour 
// communiquer avec le contrat intellingent
import { ethers } from 'ethers';
import Contract from './artifacts/contracts/ERC721Merkle.sol/ERC721Merkle.dbg.json';
// on va devoir créer une preuve de Merkle
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccack256');
//on aura besoins ! du fichier json qu'on vas mtn créer dans src/
const tokens = require('./tokens');
// on aura besoins également de l'adresse du contrat intelligent 
const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

import './App.css';

function App() {
  // on a besoins de se connecter au compte métamask à notre site 
  const [accounts, setAccounts] = useState([]);
  const [price, setPrice] = useState();

  // pour se co' à notre co' au compte métamask à notre site 
  async function requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      // on récupère les comptes co' et on les mets dans la var accounts
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // on le met dans le state setAccounts
      setAccounts(accounts);
    }
  }
  async function getPrice() {
    if (typeof window.ethereum !== 'undefined'){
      // on vas créer un provider car on aura besoins de créer une instance du contract provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //on peut récupérer le contrat grâce à son address (dispo l13), et l'abi
      const contract = new ethers.Contract(address, Contract.abi, provider);
      try {
        // on récupère le prix et on le stocke dans une const 
        const dataPrice = await contract.getPrice(); //getPrice() => on appelle une fonctionalité du sc 
        // une fois récupérer on le met dans state Price 
       setPrice(dataPrice);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    requestAccount();
    getPrice();
  }, [])


  return (
    <div className="App">
      <button onClick={mint}> MINT ON NFT</button>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
      </header> */}

    </div>
  );
}

export default App;
