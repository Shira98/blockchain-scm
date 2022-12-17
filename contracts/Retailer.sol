// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Users.sol";

/**
 * @title Retailer
 * @dev Handles retailer functions.
 */
contract Retailer {
   
   using Users for Users.User;

   Users.User private retailers;

  function addRetailer(address newRetailer) public {
    require(!retailers.isExistingUser(newRetailer), "Retailer with this address already exists!");
    retailers.addUser(newRetailer);
  }

  function isRetailer() public view returns (bool) {
    return retailers.isExistingUser(msg.sender);
  }
}
