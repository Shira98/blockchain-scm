pragma solidity >=0.4.21 <0.9.0;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SupplyChainLifecycle.sol";

contract TestSupplyChainLifecycle {

    function testItStoresTheProduct() public {

        SupplyChainLifecycle supplyChainLifecycle = SupplyChainLifecycle(DeployedAddresses.SupplyChainLifecycle());

        supplyChainLifecycle.produceProduct("Test Product","Test Desc", 12, 1, address(0));

        SupplyChainLifecycle.Product[] memory productDetailsArray = supplyChainLifecycle.getAllProductDetails();

        Assert.equal(productDetailsArray.length, 1, "One product should have been returned.");
        Assert.equal(productDetailsArray[0].productQuantity, 1, "The quantity of the product stored should be 1.");
        Assert.equal(productDetailsArray[0].productName, "Test Product", "The name of the product stored should be - Test Product.");
        Assert.equal(productDetailsArray[0].productId, 0, "The ID of the product stored should be 0.");
  
    }

    function testItReturnsProductDetailsByID() public {
        SupplyChainLifecycle supplyChainLifecycle = SupplyChainLifecycle(DeployedAddresses.SupplyChainLifecycle());

        supplyChainLifecycle.produceProduct("Test Product","Test Desc", 12, 1, address(0));

        SupplyChainLifecycle.Product memory productDetails = supplyChainLifecycle.getProductDetails(0);

        Assert.equal(productDetails.productQuantity, 1, "The quantity of the product stored should be 1.");
        Assert.equal(productDetails.productName, "Test Product", "The name of the product stored should be - Test Product.");
        Assert.equal(productDetails.productId, 0, "The ID of the product stored should be 0.");
    }
}