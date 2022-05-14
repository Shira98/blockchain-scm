import Web3 from "web3";
import SupplyChainLifecycle from "./contracts/SupplyChainLifecycle.json";

const options = {
    web3: {
        block: false,
        customProvider: new Web3("ws://localhost:8545"),
    },
    contracts: [SupplyChainLifecycle],
    events: {
        SupplyChainLifecycle: ["Produced","PickedUp","Sold","Released","Received","Paid"],
    },
};

export default options;
