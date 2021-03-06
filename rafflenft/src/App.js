/* import logo from './logo.svg'; */
import { useState, useEffect } from 'react';
// la librairie ethers et le fichier ERC721Merkle.dbg.json sont indispensables pour 
// communiquer avec le contrat intellingent
import { ethers } from 'ethers';
import Contract from './artifacts/contracts/ERC721Merkle.sol/ERC721Merkle.dbg.json';
// on va devoir créer une preuve de Merkle
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
//on aura besoins ! du fichier json qu'on vas mtn créer dans src/
const tokens = require('./tokens');
// on aura besoins également de l'adresse du contrat intelligent 
const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

import'./App.css';

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
  
  async function mint() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // on aura besoins d'un signer pour changer les données dans la blokchain
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, Contract.abi, signer);
      // dans la function mint du contrat,pour minter on a besoins d'une preuve de Merkle

      // on veut récupérer les addr' auth' à minter alors on les stock' dans un Array
      let tab = [];
      tokens.map(token =>
        tab.push(token.address))  
  
    // puis on vas hasher ces addr'
    const leaves = tab.map(address => keccak256(address));
    // à partir de cela je peux créer un arbre de Merkle
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    // j'aurais besoins d'une leaf qui est égal au compte actuellement connecté qui veut minter
    const leaf = keccak256(accounts[0]);
    // on a besoins de la leaf pour obtenir cette preuve de Merkle
    const proof = tree.getHexProof(leaf);
    // grace à le preuve de merkle on peut appeler la fonction mintNFT dans le sc
    try {
      let overrides = {
        from: accounts[0], // on transmet l'info qui veut minter et le prix du nft 
        value: price
      }
      //  on vas faire une transaction, et on va lancer la fonct' mintNFT dans le contrat 
      const transaction = await contract.mintNFT(accounts[0], proof, overrides);
      // on peut ajouter des chose supp' dans une variable overrides que l'on vas créer 
      await transaction.wait();
      // on va créer au dessus de la var' transaction une variable overriable
      // afin de lui transmettre différente information à cette fonction mintNFT
    }
    catch (err) {
      console.log(err);
    }
    }
  }
  // 2° on revient au nav' on se checke si le compte est bien connecté à métamask


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
