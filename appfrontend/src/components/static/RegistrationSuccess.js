import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from '@material-ui/core/Divider';

import "../../css/NewUser.css";

/**
 * Renders upon successful registration. 
 * Redirects to the home page after delay.
 * 
 * @author syuki
 */
const RegistrationSuccess = ({isAuthenticated}) => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(isAuthenticated){
        navigate('/');
        }
    }, []);

    //Sends out registration status to the redirected home page.  
    useEffect(() => {
        setTimeout(() => {
        navigate('/', {
            state: {
                auth: true,
                userType: location.state.userType
            }
          })
        }, 5000)
    }, []);

    return (
        <div className="new-user-body">
            <Backdrop open color="secondary">
                <Paper elevation={0} className="new-user-paper">
                    <center>
                        <Typography style={{ paddingTop: 30, fontWeight: "500" }} component="h1" variant="h5">Successfully Registered!</Typography>
                        <CheckCircleOutlineOutlinedIcon style = {{ paddingTop: 40, fontSize: 200, color: "#2D323F"}} 
                            aria-label="success tick" />
                        <p style={{ paddingBottom: "0" }}>Redirecting to home page.</p>
                        <p style={{ fontSize: 12, paddingTop: 0 }}>Please <Link className="ModalLink" href="/">click here</Link> if you're not redirected automatically.</p>
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

 export default RegistrationSuccess;