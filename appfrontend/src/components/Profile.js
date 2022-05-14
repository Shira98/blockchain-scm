import React from "react"; 
import { newContextComponents } from "@drizzle/react-components";
 
const { AccountData, ContractData, ContractForm } = newContextComponents;

/**
 * Component for the profile page. Fetches profile details from the first available account.
 * 
 * @author syuki
 */
export default ({ drizzle, drizzleState }) => {
    return(
        <div>
            <h1>My Profile</h1>
            <AccountData
                drizzle={drizzle}
                drizzleState={drizzleState}
                accountIndex={0}
                units="ether"
                precision={3}
            />
        </div>
    );
};