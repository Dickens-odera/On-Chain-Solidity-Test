// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
  * @title OnchainERC20Token
  * @dev A simple ERC20 token
  * @author Dickens Odera dickensodera9@gmail.com
 */
contract OnChainERC20Token is ERC20 {

  mapping(address => uint ) public _balances;
  mapping(address => mapping(address => uint)) public _allowances;

  constructor(uint initialSupply) public ERC20("OnChain Token","ONT") {
    _mint(msg.sender, initialSupply * 10 ** decimals());
  }
}
