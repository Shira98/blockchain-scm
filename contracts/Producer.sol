// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Users.sol";

/**
 * @title Producer
 * @dev Handles producer functions.
 */
contract Producer {
   
    using Users for Users.User;
    Users.User private producers;

    function addProducer(address newProducer) public {
        require(!producers.isExistingUser(newProducer), "Producer with this address already exists!");
        producers.addUser(newProducer);
    }

    function isProducer() public view returns (bool) {
        return producers.isExistingUser(msg.sender);
    }
}
