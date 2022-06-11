// 1) créer le contract ERC721A et token.json (add diff' add' auth' à minter)
// 2) deploiement du scripts et 
// 3) npx hardhat node pour les chaînes de test, on laisse tourner et then 
// on lance un nouv' terminal pour lancer une cmd qui permettra de déployer le sc:
//npx hardhat run scripts/deploy.js --network localhost et on obtient
// l'add sur laquelle le sc a été déployé




const hre = require("hardhat");
// on utilise une librairie pour construire l'arbre de Merkle 
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const tokens = require('./tokens.json');

async function main() {
  // on créer un tab pour lister les diff' add' authorisées à minter
  // on vas faire un mapping 
  // 
  let tab = [];
  tokens.map(token => {
    tab.push(token.address);
  })
  const leaves = tab.map(address => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();

  const Raffle = await hre.ethers.getContractFactory("ERC721Merkle");
  const raffle = await Raffle.deploy("RETROS FUNKYS CATS", "RFC", root);

  await raffle.deployed();

  console.log("Raffle deployed to:", raffle.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
