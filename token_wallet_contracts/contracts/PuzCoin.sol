// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Fungible
// 0xFD316A4C2123abEf37931b5e56607d1Ef3c47Cb0
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract PuzCoin is ERC20Detailed, ERC20Capped, Ownable {
    constructor()
    ERC20Detailed("PuzCoin", "PUZ", 4) 
    ERC20Capped(10000000000)
    payable public {}
}

