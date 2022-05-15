pragma solidity >=0.4.21 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SupplyChainLifecycle.sol";

contract TestSupplyChainLifecycle {

    function testItStoresAValue() public {
        SupplyChainLifecycle supplyChainLifecycle = SupplyChainLifecycle(DeployedAddresses.SupplyChainLifecycle());

        supplyChainLifecycle.produceProduct("Test Product","Test Desc", 12, 1, address(0));

        // SupplyChainLifecycle.Product expected = SupplyChainLifecycle.Product({
        //     productStatus: Status.PRODUCED,
        //     currentStatusUser: address(0),
        //     productId: 0,
        //     productName: "Test Product",
        //     productDesc: "Test Desc",
        //     productPrice: 12,
        //     productQuantity: 1,
        //     producerAddress: address(0),
        //     distributorAddress: address(0),
        //     retailerAddresses: address(0),
        //     consumerAddress: address(0)
        // });

        Assert.equal(supplyChainLifecycle.getAllProductDetails(), 1, "A single product should have been returned.");
    }
}