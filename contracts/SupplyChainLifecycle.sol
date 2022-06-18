// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Producer.sol";
import "./Retailer.sol";
import "./Distributor.sol";

/**
 * @title SupplyChainLifecycle
 * @dev Deals with product life cycle statuses for all the parties involved.
 */
contract SupplyChainLifecycle is Producer, Retailer, Distributor {

    enum Status { 
        PRODUCED,
        PICKED_UP,
        RECEIVED,
        PAID
    }

    //Define the product of this supply chain.
    struct Product {
        Status productStatus;
        address currentStatusUser;
        uint productId;
        string productName;
        string productDesc;
        uint productPrice;
        uint productQuantity;
        address producerAddress;
        address distributorAddress;
        address retailerAddresses;
        address consumerAddress;
    }

   Status constant initialStatus = Status.PRODUCED;
   uint productID;

   Product[] public products;

   //Define events to emit based on statuses, linked by the product ID.
   event Produced(uint productID);
   event PickedUp(uint productID);
   event Sold(uint productID);
   event Released(uint productID);
   event Received(uint productID);
   event Paid(uint productID);

   constructor() public payable {
       productID = 0;
   }

   /*Set of functions to update product statuses.*/
   //Accessible by - 
   //       - Producers
    function produceProduct(string memory prodName, string memory prodDesc,
                            uint prodPrice, uint prodQty, address producerAdd) public isProducer {
       products.push(Product({
           productStatus: Status.PRODUCED,
           currentStatusUser: producerAdd,
           productId: productID,
           productName: prodName,
           productDesc: prodDesc,
           productPrice: prodPrice,
           productQuantity: prodQty,
           producerAddress: producerAdd,
           distributorAddress: address(0),
           retailerAddresses: address(0),
           consumerAddress: address(0)
       })); 

       productID += 1;
       emit Produced(productID);
   }

    //Accesible by -
    //      - Retailer
    //      - Distributor
    function pickUpProduct(uint prodId) public {
        require(isRetailer() || isDistributor(), "Neither a retailer nor a distributor.");
        if(isRetailer()) {
            products[prodId].productStatus = Status.PICKED_UP;
            products[prodId].currentStatusUser = msg.sender;
            products[prodId].retailerAddresses = msg.sender;
        }

        if(isDistributor()) {
            products[prodId].productStatus = Status.PICKED_UP;
            products[prodId].currentStatusUser = msg.sender;
            products[prodId].distributorAddress = msg.sender;
        }
        emit PickedUp(prodId);
   }

    //Accesible by -
    //      - Retailer
    //      - Distributor
    //      - Consumer (should be a sell button at retailer's side)
    function buyProduct(uint prodId) public payable {
        require(isRetailer() || isDistributor(), "Neither a retailer nor a distributor.");
        products[prodId].productStatus = Status.PAID;
        products[prodId].currentStatusUser = msg.sender;
        emit Paid(prodId);
   }
    //Accesible by -
    //      - Retailer
    //      - Distributor
    function receiveProduct(uint prodId) public {
        require(isRetailer() || isDistributor(), "Neither a retailer nor a distributor.");
        products[prodId].productStatus = Status.RECEIVED;
        products[prodId].currentStatusUser = msg.sender;
        emit Received(prodId);
   }

    /* Getters. */
    
    function getProductDetails(uint prodId) public view returns (Product memory) {
       return products[prodId];
    } 

    function getAllProductDetails() public view returns (Product[] memory) {
       return products; //filter based on the address of current user's role.
    } 
}
