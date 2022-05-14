import React from "react"; 
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import '../../css/NotFound.css';
 
/**
 * Component for a customized 404 page.
 * 
 * @author syuki
 */
export default class NotFound extends React.Component {

    render() {
        return(
            <div className="not-found">
                <h1>404</h1>
                <h2>Oops! Looks like the page you're looking for doesn't exist.</h2>
                <Grid container justifyContent="center">
                    <Grid item xs={2}>
                        <Button variant="outlined" className="nf-button">Go Back</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="outlined" className="nf-button"  component={Link} to="/">Home</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
};
