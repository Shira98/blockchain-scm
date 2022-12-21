import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import LockIcon from '@material-ui/icons/Lock';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from '@material-ui/core/Divider';

import "../../css/NewUser.css";

/**
 * Prompts unregistered users to sign-up.
 * Unregistered users can sign up as producers, distributors, retailers here.
 * 
 * @author syuki
 */
const NewUser = ({isAuthenticated}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated){
        navigate('/');
        }
    }, []);

    return (
        <div className="new-user-body">
            <Backdrop open className="backdrop-design">
                <Paper elevation={0} className="new-user-paper">
                    <center>
                        <LockIcon fontSize="large" aria-label="back" style={{ fontSize: 50 }} />
                    </center>
                    <center>
                        <br/>
                        <Typography component="h1" variant="h5" style={{ fontWeight: "500" }}>New Here?</Typography>
                        <p>We noticed the address you're currently using is not registered with us. 
                        Please switch to an existing user address or register this address to use 
                        this application.</p>
                        <Button style={{ width: 200, marginBottom: 30 }}
                                variant="contained"
                                color="primary"
                                className="nf-button"
                                onClick={() => navigate("/register")}
                            >
                                I'd like to register
                        </Button>
                        <Divider style={{ marginBottom: 20 }} />
                        {/* social media */}
                        <Grid container justifyContent="center">
                            <Grid item xs={2}>
                                <Link className="ModalLink" href="https://github.com/Shira98" target="_blank" >{" "}<GitHubIcon /></Link>
                            </Grid>
                            <Grid item xs={1}> 
                                <Link className="ModalLink" href="https://twitter.com/d_praneetha" target="_blank" >{" "}<TwitterIcon /></Link>
                            </Grid>
                            <Grid item xs={2}>
                                <Link className="ModalLink" href="https://www.linkedin.com/in/praneetha-d-13996517a/" target="_blank">{"   "}
                                    <LinkedInIcon />
                                </Link>
                            </Grid>
                        </Grid>
                        <br/>
                        Powered by <Link className="ModalLink" href="https://mui.com/" target="_blank" >material-ui</Link> and 
                        <Link className="ModalLink" href="https://reactjs.org/" target="_blank" 
                        > {" "}React</Link> &copy; {new Date().getFullYear()} 
                    </center>
                </Paper>
            </Backdrop>
        </div>
    );
 };

 export default NewUser;