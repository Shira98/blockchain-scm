const SupplyChainLifecycle = artifacts.require("SupplyChainLifecycle");

contract("SupplyChainLifecycle", accounts => {
  it("...should store the new test product details.", async () => {
    const supplyChainInstance = await SupplyChainLifecycle.deployed();

    await supplyChainInstance.produceProduct("Test Product","Test Desc", 12, 1, { from: accounts[0] });

    const productDetails = await supplyChainInstance.getAllProductDetails.call();

    assert.equal(productDetails.length, 1, "A single product should have been returned.");
  });
});
