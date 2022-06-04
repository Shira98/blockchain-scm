import React from "react"; 
import { useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import '../../css/NotFound.css';

/**
 * Component for a customized 404 page.
 * 
 * @author syuki
 */
const NotFound = () => {

    const navigate = useNavigate();

    return(
        <div className="not-found">
            <img src="/404.png" alt="404"/>
            <h2>Oops! Looks like the page you're looking for doesn't exist.</h2>
            <Grid container justifyContent="center">
                <Grid item xs={3}>
                    <Button variant="outlined" className="nf-button" onClick={() => navigate(-1)}>Go Back</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" className="nf-button" onClick={() => navigate("/")}>Home</Button>
                </Grid>
            </Grid>
        </div>
    )
};

export default NotFound;
