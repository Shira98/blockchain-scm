const SupplyChainLifecycle = artifacts.require("SupplyChainLifecycle");

module.exports = function(deployer) {
  deployer.deploy(SupplyChainLifecycle);
};
