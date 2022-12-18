import React from "react"; 

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from "@material-ui/core/Grid";

import {STATUS_ACTIONS} from './enum/ProductStatusEnum';

import "../css/PopUpModal.css";

/**
 * Component to update the status of a batch by interacting with the contracts. 
 * Takes product ID and the action to be performed as input props.
 * 
 * @author syuki
 */
export default class PerformStatusAction extends React.Component {

    getActionSpecificMethod(action){
        let method = null;
        if(action != null && this.props.contractName != null){
            switch(action) {
                case STATUS_ACTIONS[0]:
                    method = this.props.contractName.methods["markProductReadyForPickup"];
                    break;
                case STATUS_ACTIONS[1]:
                    method = this.props.contractName.methods["pickUpProduct"];
                    break;
                case STATUS_ACTIONS[2]:
                    method = this.props.contractName.methods["releaseProductShipment"];
                    break;
                case STATUS_ACTIONS[3]:
                    method = this.props.contractName.methods["receiveProductShipment"];
                    break;
                case STATUS_ACTIONS[4]:
                    method = this.props.contractName.methods["markProductReadyForSale"];
                    break;
                case STATUS_ACTIONS[5]:
                    method = this.props.contractName.methods["buyProduct"];
                    break;
                case STATUS_ACTIONS[6]:
                    method = this.props.contractName.methods["sellProductToConsumer"];
                    break;
            }
        }
        return method;
    }

    confirmAction(){
        this.props.showLoaderScreen();
        const contractMethod = this.getActionSpecificMethod(this.props.action);
        if(contractMethod != null){
            contractMethod(
                this.props.productId
            )
            .send(
                {
                    from: this.props.currentAddress,
                    gas: 1000000
                } 
            )
            .then((receipt) => {
                this.props.setTransactionSuccess(true);
                console.log(receipt);
                this.props.hideLoaderScreen();
                this.props.closePopup();
            })
            .catch((error) => {
                this.props.setTransactionSuccess(false);
                console.log(error);
                this.props.hideLoaderScreen();
                this.props.closePopup();
            });
        }
        else {
            this.props.setTransactionSuccess(false);
            this.props.hideLoaderScreen();
            this.props.closePopup();
        }
    }

    toCamelCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    render() {
        return(
            <Dialog
            open={this.props.open}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            onClose={this.props.closePopup}
            scroll="paper" 
            className="popup-modal">
                <div style={{ paddingBottom: "20px"}}>
                    <center>
                        <DialogTitle id="scroll-dialog-title">Confirm {this.toCamelCase(this.props.action)}?</DialogTitle>
                        <DialogActions>
                            <Grid container color="secondary" className="form-grid"  justifyContent="center" >
                                <Grid item xs={3}>
                                    <Button variant="contained" className="nf-button" color="primary" onClick={this.props.closePopup}>Close</Button>
                                </Grid> 
                                <Grid item xs={3}>
                                    <Button variant="contained" className="nf-button" color="primary" onClick={this.confirmAction.bind(this)}>Confirm</Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </center>
                </div>
            </Dialog>
        )
    }
};