import React from "react"; 

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';

import "../css/Profile.css";

/**
 * Component for the profile page. Fetches profile details from the registered user's account.
 * 
 * @author syuki
 */
export default ({ drizzle, drizzleState, userType, close, open, anchorEl }) => {
    
    return(
        <Menu
                className="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                disableScrollLock={true}
                PaperProps={{
                    style: {
                        transform: 'translateX(-10px) translateY(60px)',
                        padding: "10px 30px 20px 30px"
                    }
                }}
                open={open}
                onClose={close}
        >
            <div>
                <center>
                    <AccountCircle style={{ fontSize: 100 }} /> 
                    <br/>
                    <Button 
                        variant="outlined" 
                        style={{ color: "#03989E", borderColor: "#03989E" }}
                        disabled={true}>
                        {userType}
                    </Button>
                </center>
                <br/>
                <div className="profile-details">
                    <div style={{ paddingBottom: "24px" }}>
                        <h4>Account Address</h4> 
                        <p>{drizzleState.accounts[0]}</p>
                    </div>
                    <div>
                        <h4>Account Balance</h4> 
                        <p>{drizzleState.accountBalances[drizzleState.accounts[0]]} <b>wei</b></p>
                    </div>
                </div>
            </div>
        </Menu>
    );
};