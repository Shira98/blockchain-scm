import SupplyChainLifecycle from "./contracts/SupplyChainLifecycle.json";

const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://localhost:8545"
        }
    },
    contracts: [SupplyChainLifecycle],
    events: {
        SupplyChainLifecycle: ["Produced","PickedUp","Sold","Released","Received","Paid"],
    },
};

export default options;
