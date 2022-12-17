import React from 'react';  
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';  
import AccountCircle from '@material-ui/icons/AccountCircle';

import '../../css/App.css';

/**
 * Header component. Present in every page when user is an authenticated one.
 * 
 * @author syuki
 */
export default function Header({isAuthenticated}) {
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
                        <NavLink to="/profile" id="right-anchored-navlink" className="undecorated-links"> 
                            <IconButton color="inherit">
                                <AccountCircle style={{ fontSize: 40 }}/>
                            </IconButton>
                        </NavLink> 
                    </Toolbar>
                </AppBar>   
            </div>
        );
    }
};
