import React from "react"; 
import { Navigate } from "react-router-dom";

import AccountCircle from '@material-ui/icons/AccountCircle';

/**
 * Component for the profile page. Fetches profile details from the registered user's account.
 * 
 * @author syuki
 */
export default ({ drizzle, drizzleState, isAuthenticated, userType }) => {

    if(!isAuthenticated){
        return <Navigate to="/new-user" replace />;
    }
    
    return(
        <div className="main-body" color="primary">
            <center>
                {/* <Paper className="app" style={{ maxWidth: "500px", minHeight: "400px", backgroundColor: "#92869f8a" }}> */}
                    {/* <br />
                    <br /> */}
                    <AccountCircle style={{ fontSize: 100 }} />
                    <br />
                    <br />
                    <p>Role: {userType}</p>
                    <h4>Account Address</h4> {drizzleState.accounts[0]}
                    <h4>Account Balance</h4> {drizzleState.accountBalances[drizzleState.accounts[0]]} wei
                {/* </Paper> */}
            </center>
        </div>
    );
};