import React from 'react';  
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'; 
import Badge from '@material-ui/core/Badge';  
import AccountCircle from '@material-ui/icons/AccountCircle';

/**
 * Header component. Present in every page.
 * 
 * @author syuki
 */
export default function Header() {
    return(
        <div className="HeaderTop"> 
            <AppBar position="static" color="secondary" elevation={0}>
                <Toolbar> 
                <div> 
                <NavLink exact to="/"  style={{textDecoration: "none", color: "inherit"}}> 
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge color="inherit">
                        {/* add icon */} 
                        <Typography noWrap>
                        Batches
                        </Typography>  
                        </Badge>
                    </IconButton>
                    </NavLink>
                </div> 
                <div> 
                    <NavLink to="/profile" style={{textDecoration: "none", color: "inherit"}}> 
                    <IconButton
                        edge="end"
                        aria-label="account of current user" 
                        aria-haspopup="true" 
                        color="inherit"
                    > 
                        <AccountCircle />
                    </IconButton>
                    </NavLink> 
                </div> 
                </Toolbar>
            </AppBar>   
        </div>
    )
};
