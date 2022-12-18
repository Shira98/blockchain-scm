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
        READY_FOR_PICKUP, 
        PICKED_UP, 
        SHIPMENT_RELEASED, 
        RECEIVED_SHIPMENT, 
        READY_FOR_SALE, 
        PAID,
        SOLD 
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
    event ReadyForPickup(uint productID);
    event PickedUp(uint productID);
    event ShipmentReleased(uint productID);
    event ShipmentReceived(uint productID);
    event ReadyForSale(uint productID);
    event Paid(uint productID);
    event Sold(uint productID);

   constructor() public payable {
       productID = 0;
   }

   /*Set of functions to update product statuses.*/
   
   //Accessible by - 
   //       - Producer
    function produceProduct(string memory prodName, string memory prodDesc,
                            uint prodPrice, uint prodQty, address producerAdd) public {
        require(isProducer(), "Not a producer.");
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

    //Accessible by -
    //      - Producer
    function markProductReadyForPickup(uint prodId) public {
        require(isProducer(), "Not a producer.");
        products[prodId].productStatus = Status.READY_FOR_PICKUP;
        products[prodId].currentStatusUser = msg.sender;
        emit ReadyForPickup(prodId);
   }

    //Accessible by -
    //      - Distributor
    function pickUpProduct(uint prodId) public {
        require(isDistributor(), "Not a distributor.");
        products[prodId].productStatus = Status.PICKED_UP;
        products[prodId].currentStatusUser = msg.sender;
        products[prodId].distributorAddress = msg.sender;
        emit PickedUp(prodId);
   }

    //Accessible by -
    //      - Retailer
    //      - Distributor
    function buyProduct(uint prodId) public payable {
        require(isRetailer() || isDistributor(), "Neither a retailer nor a distributor.");
        products[prodId].productStatus = Status.PAID;
        products[prodId].currentStatusUser = msg.sender;
        emit Paid(prodId);
   }

    //Accessible by -
    //      - Distributor
    function releaseProductShipment(uint prodId) public {
        require(isDistributor(), "Not a distributor.");
        products[prodId].productStatus = Status.SHIPMENT_RELEASED;
        products[prodId].currentStatusUser = msg.sender;
        emit ShipmentReleased(prodId);
   } 

    //Accessible by -
    //      - Retailer
    function receiveProductShipment(uint prodId) public {
        require(isRetailer(), "Not a retailer.");
        products[prodId].productStatus = Status.RECEIVED_SHIPMENT;
        products[prodId].currentStatusUser = msg.sender;
        products[prodId].retailerAddresses = msg.sender;
        emit ShipmentReceived(prodId);
   }

    //Accessible by -
    //      - Retailer
    function markProductReadyForSale(uint prodId) public {
        require(isRetailer(), "Not a retailer.");
        products[prodId].productStatus = Status.READY_FOR_SALE;
        products[prodId].currentStatusUser = msg.sender;
        emit ReadyForSale(prodId);
   }

   //Accessible by -
    //      - Retailer
    function sellProductToConsumer(uint prodId) public payable {
        require(isRetailer(), "Not a retailer.");
        products[prodId].productStatus = Status.SOLD;
        products[prodId].currentStatusUser = msg.sender;
        emit Sold(prodId);
   }

    /* Getters. */
    
    function getProductDetails(uint prodId) public view returns (Product memory) {
       return products[prodId];
    } 

    function getAllProductDetails() public view returns (Product[] memory) {
       return products;
    } 
}
