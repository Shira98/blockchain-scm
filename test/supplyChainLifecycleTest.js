const SupplyChainLifecycle = artifacts.require("SupplyChainLifecycle");

contract("SupplyChainLifecycle", (accounts) => {
    
    const producer = accounts[0];
    const distributor = accounts[1];
    const retailer = accounts[2];

    it("Producer should be able to add a product to the chain.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();
        await supplyChainLifecycleInstance.addProducer(producer);
        await supplyChainLifecycleInstance.produceProduct("Test Product","Test Desc", 12, 1, producer, {from: producer});
        const productDetailsArray = await supplyChainLifecycleInstance.getAllProductDetails.call();

        assert.equal(productDetailsArray.length, 1, 'One product should have been returned.');
        assert.equal(productDetailsArray[0].productQuantity, 1, 'The quantity of the product stored should be 1.');
        assert.equal(productDetailsArray[0].productName, "Test Product", 'The name of the product stored should be - Test Product.');
        assert.equal(productDetailsArray[0].productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetailsArray[0].productStatus, 0, 'The product should be in PRODUCED status.');
    });

    it("Users should be able to fetch product details by ID.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();
        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productQuantity, 1, 'The quantity of the product stored should be 1.');
        assert.equal(productDetails.productName, "Test Product", 'The name of the product stored should be - Test Product.');
        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
    });

    it("Producer should be able to enable the product for pick up.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();
        await supplyChainLifecycleInstance.markProductReadyForPickup(0, {from: producer});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 1, 'The product should be in READY FOR PICKUP status.');
    });

    it("Distributor should be able to pick up the product.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();
        await supplyChainLifecycleInstance.addDistributor(distributor);

        await supplyChainLifecycleInstance.pickUpProduct(0, {from: distributor});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 2, 'The product should be in PICKED UP status.');
        assert.equal(productDetails.distributorAddress, distributor, 'The product should contain distributor address details.');
    });

    it("Distributor should be able to pay the producer.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();

        await supplyChainLifecycleInstance.buyProduct(0, {from: distributor});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 6, 'The product should be in PAID status.');
    });

    it("Distributor should be able to ship the product.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();

        await supplyChainLifecycleInstance.releaseProductShipment(0, {from: distributor});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 3, 'The product should be in SHIPMENT RELEASED status.');
    });

    it("Retailer should be able to receive the shipped product.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();
        await supplyChainLifecycleInstance.addRetailer(retailer);

        await supplyChainLifecycleInstance.receiveProductShipment(0, {from: retailer});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 4, 'The product should be in SHIPMENT RECEIVED status.');
        assert.equal(productDetails.retailerAddresses, retailer, 'The product should contain retailer address details.');
    });

    it("Retailer should be able to pay the distributor.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();

        await supplyChainLifecycleInstance.buyProduct(0, {from: retailer});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 6, 'The product should be in PAID status.');
    });

    it("Retailer should be able to put the product up for sale.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();

        await supplyChainLifecycleInstance.markProductReadyForSale(0, {from: retailer});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 5, 'The product should be in READY FOR SALE status.');
    });

    it("Retailer should be able to sell the product to the consumer.", async () => {
        const supplyChainLifecycleInstance = await SupplyChainLifecycle.deployed();

        await supplyChainLifecycleInstance.sellProductToConsumer(0, {from: retailer});

        const productDetails = await supplyChainLifecycleInstance.getProductDetails.call(0);

        assert.equal(productDetails.productId, 0, 'The ID of the product stored should be 0.');
        assert.equal(productDetails.productStatus, 7, 'The product should be in SOLD status.');
    });
});