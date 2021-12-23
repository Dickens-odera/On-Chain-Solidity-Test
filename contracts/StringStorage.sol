// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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
    * @dev enable the smart contract owner to add new strings
    * @param _string string
   */
  function addNewString(string memory _string) public onlyOwner{
    require(bytes(_string).length > 0,"Value cannot be empty"); //ensure not an empty string value
    myStrings.push(_string);
    totalStrings = totalStrings.add(1); //to avoid overflow
    emit NewString(msg.sender, _string); //to help in Logging
  }
}
