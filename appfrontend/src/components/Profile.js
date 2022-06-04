import React from "react"; 

import Paper from "@material-ui/core/Paper";
import AccountCircle from '@material-ui/icons/AccountCircle';

/**
 * Component for the profile page. Fetches profile details from the first available account.
 * 
 * @author syuki
 */
export default ({ drizzle, drizzleState }) => {
    return(
        <center>
            {/* <Paper className="app" style={{ maxWidth: "500px", minHeight: "400px", backgroundColor: "#92869f8a" }}> */}
                {/* <br />
                <br /> */}
                <AccountCircle style={{ fontSize: 100 }} />
                <br />
                <br />
                <h4>Account Address</h4> {drizzleState.accounts[0]}
                <h4>Account Balance</h4> {drizzleState.accountBalances[drizzleState.accounts[0]]} wei
            {/* </Paper> */}
        </center>
    );
};