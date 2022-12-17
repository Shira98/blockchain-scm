// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Users.sol";

/**
 * @title Consumer
 * @dev Handles consumer functions.
 */
contract Consumer {
    
    using Users for Users.User;
    Users.User private consumers;

    function addConsumerr(address newConsumer) public {
        require(!consumers.isExistingUser(newConsumer), "Consumer with this address already exists!");
        consumers.addUser(newConsumer);
    }

    function isConsumer() public view returns (bool) {
    return consumers.isExistingUser(msg.sender);
  }
}
