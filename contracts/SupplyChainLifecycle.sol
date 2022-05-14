// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

/**
 * @title SupplyChainLifecycle
 * @dev Deals with product life cycle statuses for all the parties involved.
 */
contract SupplyChainLifecycle {

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
   function produceProduct(string memory prodName, string memory prodDesc, uint prodPrice, uint prodQty, address producerAdd) public {
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

    function pickUpProduct(uint prodId) public {
        products[prodId].productStatus = Status.PICKED_UP;
        products[prodId].currentStatusUser = msg.sender;
        emit PickedUp(prodId);
   }

    function buyProduct(uint prodId) public {
        products[prodId].productStatus = Status.PAID;
        products[prodId].currentStatusUser = msg.sender;
        emit Paid(prodId);
   }

    function receiveProduct(uint prodId) public {
       products[prodId].productStatus = Status.RECEIVED;
       products[prodId].currentStatusUser = msg.sender;
       emit Received(prodId);
   }

    /* Getters. */
    
    function getProductDetails(uint prodId) public view returns (Product memory) {
       return products[prodId];
    } 

    function getAllProductDetails() public view returns (Product[] memory) {
       return products;
    } 
}
