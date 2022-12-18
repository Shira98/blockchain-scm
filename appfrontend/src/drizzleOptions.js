import SupplyChainLifecycle from "./contracts/SupplyChainLifecycle.json";
import Web3 from 'web3';
 

const options = {
    web3: {
        // customProvider: new Web3('ws://localhost:8545'),
        block: false,
        fallback: {
            type: "ws",
            url: "ws://localhost:8545"
        }
    },
    contracts: [SupplyChainLifecycle],
    events: {
        SupplyChainLifecycle: ["Produced","ReadyForPickup","PickedUp","Sold","ShipmentReleased","ShipmentReceived","ReadyForSale","Paid"],
    }
};

export default options;
