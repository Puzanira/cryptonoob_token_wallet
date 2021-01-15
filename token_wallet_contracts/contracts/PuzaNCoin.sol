// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";

// Non-Fungible
// 0x392E8e92bc5581AAaAb721FdFaCAC53B973Ff5E5
contract PuzaNCoin is ERC721Metadata {
    uint32 public Id; // last issued token
    mapping(address => uint32) public MDTrack; // Id => Ethereum address

    constructor()
    ERC721Metadata("PuzaNCoin", "PUZAN")
    payable public {
        Id = 0;
    }

    function createNFT_(address receiver, string calldata metadata) external returns (uint32) {
        Id++;
        _mint(receiver, Id);
        _setTokenURI(Id, metadata);
        MDTrack[receiver] = Id;
        return Id;
    }

    function transferNFT_(address sender, address receiver, uint32 transId, string calldata metadata) external {
        _transferFrom(sender, receiver, transId);
        _setTokenURI(transId, metadata);
        delete MDTrack[sender];
        MDTrack[receiver] = Id;
    }

}