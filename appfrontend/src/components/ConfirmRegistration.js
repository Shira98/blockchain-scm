import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

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

import { CircularPageLoader } from "./static/CircularPageLoader";

import { USER_TYPES } from "./enum/UsersEnum";

import "../css/NewUser.css";

/**
 * Renders the registration confirmation page for new addresses.
 * 
 * @author syuki
 */
const ConfirmRegistration = ({drizzle, drizzleState, isAuthenticated}) => {

    const [showLoader, setShowLoader] = useState();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(isAuthenticated){
            navigate('/');
        }
    }, []);

    function getContractMethod() {
        let method = null;
        switch(location.state.type) {
            case USER_TYPES[0]:
                method = drizzle.contracts.SupplyChainLifecycle.methods["addProducer"];
                break;
            case USER_TYPES[1]:
                method = drizzle.contracts.SupplyChainLifecycle.methods["addDistributor"];
                break;   
            case USER_TYPES[2]:
                method = drizzle.contracts.SupplyChainLifecycle.methods["addRetailer"];
                break; 
        }
        return method;
    }

    function addNewUser() {
        setShowLoader(true);
        const contractMethod = getContractMethod();
        contractMethod(drizzleState.accounts[0])
        .send(
            {
                from: drizzleState.accounts[0],
                gas: 1000000
            } 
        )
        .then((receipt) => {
            console.log(receipt);
            setShowLoader(false);
            navigate("/registration-success", {
                state: {
                    userType: location.state.type
                }
              });
        })
        .catch((error) => {
            console.log(error);
            setShowLoader(false);
            navigate("/registration-failure");
        });
    }

    return (
        <div className="new-user-body">
            <Backdrop open className="backdrop-design">
                <Paper elevation={0} className="new-user-paper">
                    <IconButton color="inherit">
                        <ArrowBackIosIcon fontSize="large" aria-label="back" onClick={() => navigate(-1)} />
                    </IconButton>
                    <center>
                        <Typography component="h1" variant="h5" style={{ fontWeight: "500" }}>Confirm registration as '{location.state? location.state.type : null}'?</Typography>
                        <p>By clicking on confirm, you agree to our terms and conditions as well. <br/> 
                        Please read our terms and conditions here.</p>
                        <Button style={{ width: 200, marginBottom: 30 }}
                                variant="contained"
                                color="primary"
                                className="confirm-button"
                                onClick={addNewUser}
                            >
                            Confirm
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
            <CircularPageLoader 
                open={showLoader} 
            />
        </div>
    );
 };

 export default ConfirmRegistration;