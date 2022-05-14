/**
 * An enum component for the entire front-end code.
 * 
 * @author syuki
 */

/**
 * Actions available to the party that's selling the product - all indicators, not actions.
 */
export const PRODUCT_STATUSES = {
    0: "READY FOR PICKUP", 
    1: "PICKED UP",
    2: "DELIVERED",
    3: "SOLD" 
};

/**
 * Actions available to the party that's buying the product.
 */
export const STATUS_ACTIONS = {
    0: "PICK UP",
    1: "RECEIVE",
    2: "PAY",
    3: "PAID" 
};
