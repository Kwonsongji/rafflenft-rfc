// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ERC721Merkle is ERC721 {
  // racine de l'arble de Merkle
  bytes32 immutable public root;
  uint tokenId = 1;

  constructor( string memory name, string memory symbol, bytes32 merkleroot )
  ERC721(name, symbol){
    // on passe au constructor la racine root 
    root = merkleroot;
  }
  function getPrice() public view returns(uint){
    uint _price = 0.6 ether;
    return _price;
  }
  function _isWhiteListed(address account, bytes32[] calldata proof )internal view returns(bool){
    return _verify(_leaf(account), proof);
  }
  function mintNFT(address account, bytes32[] calldata proof) external payable {
    uint price = getPrice();
    require(_isWhiteListed (account, proof), "Not on the whitelist");
    require(msg.value >= price, "Not enough funds");
    _safeMint(account, tokenId,"");
    tokenId++;

  }

  function _leaf( address account) internal pure returns(bytes32){
    // la fonction keccak va prendre en param' un account qu'elle va hasher
    return keccak256(abi.encodePacked(account));
  }
  // la fonct' verify va vérifier si la leaf est bien dans l'arbre de Merkle par rapport à la racine, et une preuve de merkle 
  function _verify(bytes32 leaf, bytes32[] memory proof) internal view returns(bool){
    return MerkleProof.verify(proof, root, leaf);

  }

  
}