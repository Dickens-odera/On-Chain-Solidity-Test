// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./OnChainERC20Token.sol";

/**
  * @dev A Simple stmart contract for string storage
  * @author Dickens Odera dickensodera9@gmail.com
 */
contract StringStorage is Ownable {
  using SafeMath for uint256;
  string[] public myStrings;
  uint public totalStrings = 0; //to help keep track of the number of strings

  event NewString(address indexed user, string indexed stringValue);

  constructor() public {
  }

  /**
    * @dev sends 50 ERC20 tokens to the smart contract owner on addition of a new string
    * @param _string string
    * @param token IERC20
   */
  function addNewString(string memory _string, IERC20  token) public onlyOwner{
    require(bytes(_string).length > 0,"Value cannot be empty"); //ensure not an empty string value
    uint balance = token.balanceOf(msg.sender);
    require(balance >= 50,"Insufficient token balance");
    token.transferFrom(msg.sender, owner(), 50);
    myStrings.push(_string);
    totalStrings = totalStrings.add(1); //to avoid overflow
    emit NewString(msg.sender, _string); //to help in Logging
  }
}
