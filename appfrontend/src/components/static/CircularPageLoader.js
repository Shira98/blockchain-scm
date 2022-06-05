import React from "react"; 

import CircularProgress  from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import '../../css/App.css';

/**  
 * A transparent circular page loader.
 * 
 * @author syuki
*/
export const CircularPageLoader = (props) => (
    <div> 
        <Backdrop
            open={props.open} 
            style={{  
                zIndex: 2000
            }}
        >
            <CircularProgress style={{  color: 'white' }}/>   
        </Backdrop> 
    </div>
) 