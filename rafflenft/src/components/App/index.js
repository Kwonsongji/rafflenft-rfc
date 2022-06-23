import './style.css';
import InfosAccount from '../InfosAccount';
import AddWhiteList from '../AddWhiteList';
/* import logo from './logo.svg'; */
import { useState, useEffect } from 'react';
import Firebase from '../Firebase';
// la librairie ethers et le fichier ERC721Merkle.dbg.json sont indispensables pour 
// communiquer avec le contrat intellingent
import { ethers, providers } from 'ethers';
import Contract from '../../artifacts/contracts/ERC721Merkle.sol/ERC721Merkle.json';

// on va devoir créer une preuve de Merkle
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
//on aura besoins ! du fichier json qu'on vas mtn créer dans src/
const tokens = require('../../tokens.json');
// on aura besoins également de l'adresse du contrat intelligent 
const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

/*-----------------COMPONENTS-----------------*/

const ref = Firebase.firestore().collection('NFTwhitelist');

function App() {
  //nbre de pers' sur la liste
  const [countData, setCountData] = useState(0);
// Get number of users in the whitelist
  // on a besoins de se connecter au compte métamask à notre site 
  // on va récupérer toutes les add' et on va le stocker dans un Array
  const [accounts, setAccounts] = useState([]);
  const [price, setPrice] = useState();
  // on ne veut pas afficher les infos' tant que les datas n'ont pas été chargé
  // et également tant que le user n'a pas été connecté à métamask
  const [loader, setLoader] = useState(true);
//le nbr d'ether que l'user à sur son compte :
  const [balance, setBalance] = useState();
// si l'user est bien inscrit sur la whitelist
  const [success, setSuccess] = useState('');
// si il est déjà inscrit sur la whitelist/ whitelist est complète/ un certain montant en ethereu
  const [error, setError] = useState(''); 
//pour savoir le nbre de pers' incrit dans la whitelist

  //cf doc' firebase
  function getCount() {
    // on récupère la BDD et on fait un traitement
    ref.get().then(function (querySnapShot) {
      // assigner le nbre de pers' au state countData
      setCountData(querySnapShot.size)
    })
  }
// pour se co' à notre co' au compte métamask à notre site 
  async function requestAccount() {
    if (typeof window.ethereum !== 'undefined') {
      // on récupère les comptes co' et on les mets dans la var accounts
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setLoader(false); 
      // on le met dans le state setAccounts
      setAccounts(accounts);
      // on veut récupérer la balance du compte connecté à notre site web
      // pour cela on aura besoins d'un provider
      // grâce au provider, on a accès au donnés du compte
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // grâce à ça on va pouvoir récupérer la balance
      const balance = await provider.getBalance(accounts[0]);
   /*     console.log('balance', balance)   */
      // ensuite on refresh la p du navigateur et on obtient 
      //BigNumber /isBigNumber : true sur firefox parce qu'elle est en WEI;
      // 1 ETH : 10puissance10wei
      // mais avec la librairie ethers, on a la possibilité de récupérer la balance etereum
      // grâce à une fonctionalité
       const balanceInEth = ethers.utils.formatEther(balance)
   /*     console.log('balanceInEth', balanceInEth);  */
       setBalance(balanceInEth);  
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
    setLoader(false);
    getPrice();
    getCount();

  }, [])
  // Ajout d'EVENTS

  window.ethereum.addListener('connect', async (reponse) => {
    requestAccount();
    console.log('ok');
  })
  // si il change de compte, on recharge la page
  window.ethereum.on('accountsChanged', () => {
    window.location.reload();
  })
  // si il change de network(réseau) ( il passe de ropsten/ il change de chaîne princ')
  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  })
  
  window.ethereum.on('disconnect', () => {
    window.location.reload();
  })

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
  // then on se co' sur la chaîne localhost


  return (
    <div className="app">
      {error && <p className="alert error" {error}></p>}
      <AddWhiteList
        countData={countData}
        setcountData={setCountData}
        getCount={getCount}
        balance={balance}
        setBalance={setBalance}
        getBalance={getBalance}
        setError={setError}
        setSucess={setSucess}



      />
      <InfosAccount
        accounts={accounts}
        balance={balance}
        loader={loader}
      />
      <button onClick={mint}> MINT ON NFT</button>

    </div>
  );
}

export {ref}
export default App;
