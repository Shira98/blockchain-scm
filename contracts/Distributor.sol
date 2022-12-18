// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Users.sol";

/**
 * @title Distributor
 * @dev Handles distributor functions.
 */
contract Distributor {
    
    using Users for Users.User;
    Users.User private distributors;

    function addDistributor(address newDistributor) public {
        require(!distributors.isExistingUser(newDistributor), "Distributor with this address already exists!");
        distributors.addUser(newDistributor);
    }

    function isDistributor() public view returns (bool) {
    return distributors.isExistingUser(msg.sender);
  }
}
