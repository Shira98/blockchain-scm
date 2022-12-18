import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from '@material-ui/core/Divider';

import { USER_TYPES } from "./enum/UsersEnum";

import "../css/NewUser.css";

/**
 * Provides account types to users for address registration -
 *  - Producers, 
 *  - Distributors, 
 *  - Retailers.
 * 
 * @author syuki
 */
const Register = ({drizzle, drizzleState, isAuthenticated}) => {

    const navigate = useNavigate();
    const accountAddress = drizzleState.accounts[0];

    useEffect(() => {
        if(isAuthenticated){
        navigate('/');
        }
    }, []);

    return (
        <div className="new-user-body">
            <Backdrop open color="secondary">
                <Paper elevation={0} className="new-user-paper">
                    <IconButton color="inherit">
                        <ArrowBackIosIcon fontSize="large" aria-label="back" onClick={() => navigate(-1)} />
                    </IconButton>
                    <center>
                        <Typography component="h1" variant="h5" style={{ fontWeight: "500" }}>Register</Typography>
                        <p>Choose your account type for the address <b>{accountAddress}</b></p>
                        <Grid 
                            container 
                            color="secondary" 
                            justifyContent="center" 
                            direction={'column'} 
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Button style={{ width: 200 }}
                                    variant="contained"
                                    color="primary"
                                    className="nf-button"
                                    onClick={() => navigate("/confirm-registration", {
                                        state: {
                                            type: USER_TYPES[0]
                                        }
                                      })}
                                >
                                    Producer
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ width: 200 }}
                                    variant="contained"
                                    color="primary"
                                    className="nf-button"
                                    onClick={() => navigate("/confirm-registration", {
                                        state: {
                                            type: USER_TYPES[1]
                                        }
                                      })}
                                >
                                    Distributor
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button style={{ width: 200, marginBottom: 30 }}
                                    variant="contained"
                                    color="primary"
                                    className="button"
                                    onClick={() => navigate("/confirm-registration", {
                                        state: {
                                            type: USER_TYPES[2]
                                        }
                                      })}
                                >
                                    Retailer
                                </Button>
                            </Grid>
                        </Grid>
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

 export default Register;