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
    _mint(msg.sender, initialSupply);
  }

  function balanceOf(address _tokenOwner) public view virtual override returns(uint){
    return _balances[_tokenOwner];
  }

  function transfer(address _to, uint _value) public virtual override returns(bool){
      _transfer(msg.sender, _to, _value);
      return true;
  }

  function transferFrom(address _from, address _to, uint _value) public virtual override returns(bool){
    _transfer(_from, _to, _value);
    uint currentAllowance = _allowances[_from][msg.sender];
    require(currentAllowance >= _value,"Insufficient tokens");
    return true;
  }

  function allowances(address _owner, address _spender) public virtual returns(uint){
    return _allowances[_owner][_spender];
  }
}
