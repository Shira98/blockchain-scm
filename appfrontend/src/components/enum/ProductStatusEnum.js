/**
 * An enum component for holding product status details.
 * 
 * @author syuki
 */

/**
 * Actions available to the party that's selling the product - all of these are indicators, not actions.
 */
export const PRODUCT_STATUSES = {
    0: "PRODUCED",
    1: "READY FOR PICKUP",
    2: "PICKED UP",
    3: "SHIPMENT RELEASED",
    4: "SHIPMENT RECEIVED",
    5: "READY FOR SALE",
    6: "PAID",
    7: "SOLD" 
};

/**
 * Actions available to the parties involved based on product statuses.
 */
export const STATUS_ACTIONS = {
    0: "ENABLE PICKUP",
    1: "PICK UP",
    2: "SHIP",
    3: "RECEIVE SHIPMENT",
    4: "ENABLE FOR SALE",
    5: "PAY",
    6: "SELL",
    7: "-" //No action.
};
