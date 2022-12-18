import React, { useState } from 'react';  
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';  

import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { USER_TYPES } from '../enum/UsersEnum';

import Profile from '../Profile';

import '../../css/App.css';

/**
 * Header component. Present in every page when user is an authenticated one.
 * 
 * @author syuki
 */
export default function Header({isAuthenticated, userType, drizzle, drizzleState}) {

    const [showProfile, setShowProfile] = useState();
    const [anchorEl, setAnchorEl] = useState();
    const [profilePicture, setProfilePicture] = useState();

    function toggleProfile(event) {
        let profilePicturePath = "/profile-designs/Producer.png";
        if(userType == USER_TYPES[1]){
            profilePicturePath = "/profile-designs/Distributor.png";
        } 
        if(userType == USER_TYPES[2]){
            profilePicturePath = "/profile-designs/Retailer.png";
        } 
        setProfilePicture(profilePicturePath);
        setShowProfile(!showProfile);
        setAnchorEl(event.currentTarget);
    }

    if(!isAuthenticated){
        return null;
    } else {
        return(
            <div> 
                <AppBar position="static" color="secondary" elevation={0}>
                    <Toolbar> 
                        <NavLink exact to="/" className="undecorated-links"> 
                            <IconButton color="inherit">
                                <img src="/bscm_light_circle.png" alt="logo" id="app-logo-header"/>
                            </IconButton>
                        </NavLink>
                        <NavLink exact to="/" className="undecorated-links iconbutton"> 
                            <IconButton color="inherit">
                                <Typography noWrap>VIEW BATCHES</Typography>  
                            </IconButton>
                        </NavLink>
                        <IconButton color="inherit" id="right-anchored-menu-item" onClick={toggleProfile}>
                            <AccountCircle style={{ fontSize: 40 }}/> 
                            <ArrowDropDownIcon className="dropdown-arrow-icon" />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {showProfile ? 
                    <Profile 
                        open={showProfile} 
                        close={toggleProfile}
                        userType={userType} 
                        drizzle={drizzle} 
                        drizzleState={drizzleState}
                        anchorEl={anchorEl}
                        profilePicturePath={profilePicture}
                    />
                    : null
                }   
            </div>
        );
    }
};
