import React from "react"; 

import LinearProgress  from '@material-ui/core/LinearProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import '../../css/App.css';

/**  
 * A linear progress bar loader.
 * 
 * @author syuki
*/
export const PageLoader = () => (
    <div> 
        <Backdrop open color="secondary">
            <center>
                <Box>
                    <img src="/bscm_light_circle.png" alt="logo" id="app-logo"/>
                    <br/>
                    <br/>
                    <Typography variant="h7" color="textSecondary">CONNECTING TO THE CHAIN</Typography>
                    <br/>
                    <br/>
                    <LinearProgress />   
                </Box> 
            </center>
        </Backdrop> 
    </div>
) 