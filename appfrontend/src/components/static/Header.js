import React from 'react';  
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'; 
import Badge from '@material-ui/core/Badge';  

import '../../css/App.css';

/**
 * Header component. Present in every page.
 * 
 * @author syuki
 */
export default function Header() {
    return(
        <div> 
            <AppBar position="static" color="secondary" elevation={0}>
                <Toolbar> 
                    <NavLink exact to="/" className="undecorated-links"> 
                        <IconButton color="inherit">
                            <Badge color="inherit">
                                <Typography noWrap>
                                    <img src="bscm_light_circle.png" alt="logo" id="app-logo-header"/>
                                </Typography>  
                            </Badge>
                        </IconButton>
                    </NavLink>
                    <NavLink exact to="/" className="undecorated-links"> 
                        <IconButton color="inherit">
                            <Badge color="inherit">
                                <Typography noWrap> VIEW BATCHES </Typography>  
                            </Badge>
                        </IconButton>
                    </NavLink>
                    <NavLink to="/profile" id="right-anchored-navlink" className="undecorated-links"> 
                        <IconButton color="inherit">
                            <Badge color="inherit">
                                <Typography noWrap> VIEW PROFILE </Typography>
                            </Badge>
                        </IconButton>
                    </NavLink> 
                </Toolbar>
            </AppBar>   
        </div>
    )
};
