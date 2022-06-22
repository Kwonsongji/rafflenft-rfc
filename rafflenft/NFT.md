
## RAFFLE 
 1) créer le contract ERC721A et token.json (add diff' add' auth' à minter)
 2) deploiement du scripts et 
 3) npx hardhat node pour les chaînes de test, on laisse tourner et then 
 on lance un nouv' terminal pour lancer une cmd qui permettra de déployer le sc:
-npx hardhat run scripts/deploy.js --network localhost et on obtient
l'addresse sur laquelle le sc a été déployé
-go partie Front faire tout les imports, than add Hooks pour obtenir les addr' des comptes co' à métamaks, le prix 

## ETHER DE TEST 
Faucets Ropsten pour obtenir des Ethers de test :
- https://faucet.ropsten.be/
- https://faucet.dimensions.network/

## CONNEXION TO METAMASK
- import des Hooks useState et useEffect et librairies ethers
- state loader, account, balance, error, balance :
- async get Accouncts et useEffect get Accouncts
- on check si on a bien le compte co so go App:

 {!loader &&
        accounts.length > 0 ?
        <p> You are connected with this account : {accounts[0]} </p>
        :
        <p> You are not connected with Metamask to this website.</p>
      }

- pour le chargement : 
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

## AFFICHAGE DE LA BALANCE AU USER :
- add un useState balance pour savoir le nbr d'ether que l'user à sur son compte :
  const [balance, setBalance] = useState();
- go function reqAcc et add un provider :
      On veut récupérer la balance du compte connecté à notre site web, et pour cela on aura besoins d'un provider. Grâce au provider, on a accès au donnés du compte
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      Grâce à ça on va pouvoir récupérer la balance
      const balance = await provider.getBalance(accounts[0]);
       console.log('balance', balance)  
      Ensuite on refresh la p du navigateur et on obtient : BigNumber /isBigNumber : true sur firefox parce qu'elle est en WEI( 1 ETH : 10puissance10wei )
      Avec la librairie ethers, on a la possibilité de récupérer la balance etereum. Grâce à une fonctionalité :
       const balanceInEth = ethers.utils.formatEther(balance)
       console.log('balanceInEth', balanceInEth); 
       setBalance(balanceInEth);  

## INTERFACE D'ADMIN :

- npm install firebase@8.10.0 --save
- on va utiliser Cloud FireStore : une BDD NO SQL ( non relationelles )
- Get Started, nomme ton projet, désactive google analitics
- click on </> icon, nomme again, sans cocher l'option Firebase Hosting
- copier tout ce qu'il y a dans la constante firebaseConfig, 
et then appuyer sur accès à la console
- on click sur FireStoreDatabase (gauche), créer une BDD, démarer en mode Test 
 mais plus tard il faudra choisir en MODE PRODUCTION, zone europe-west, activer
- commencer une collection 
- add Firebase.js et fill it 
- import it dans App.js et on fait une réf' vers cette BDD et export ref 
- on vas tester tout ça 
- ajout du state countData pour savoir le nbre de pers' incrit dans la whitelist
- function pour récupérer le nbre de pers' insc'
- getCount dans useEffect
- testons ça so go nav', on va sur l'onglet Components on voit bien actuellement il y a 0 pers' sur la whitelist
- on add la collection whitelist bien nommé comme dans la ref,
nouv' champs address et cp cv l'address 


## ADDWHITELIST:

npm i uuid pour générer les 
