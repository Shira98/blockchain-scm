import React from "react"; 

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from "@material-ui/core/Grid";
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import "../css/PopUpModal.css";

/**
 * Component to add new batch details to the blockchain by interacting with the contracts.
 * Takes these details as input from the user.
 * 
 * @author syuki
 */
export default class ProductBatchForm extends React.Component {

    state = { 
        prodName: null,
        prodDesc: null,
        prodPrice: null,
        prodQty: null
      };
    
    createProductBatch(){
        let formData = this.state;
        this.props.contractName.methods.produceProduct(
            formData.prodName,
            formData.prodDesc,
            parseInt(formData.prodPrice),
            parseInt(formData.prodQty),
            this.props.currentAddress
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
        })
        .catch((error) => {
            this.props.setTransactionSuccess(false);
            console.log(error);
          });
        this.props.closePopup();
    }

    handleInput(input){
        const name = input.target.name;
        const newValue = input.target.value;
        this.setState({ [name]: newValue });
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
                <center>
                    <DialogTitle id="scroll-dialog-title">Enter Batch Details</DialogTitle>
                </center>
                <form onSubmit={() => this.createProductBatch()} className="form-grid"> 
                    <DialogContent dividers={true}>
                        <DialogContentText
                            id="scroll-dialog-description"
                            ref={null}
                            tabIndex={-1}
                        >
                            <br />
                            <Grid 
                                container 
                                color="secondary" 
                                justifyContent="center" 
                                direction={'column'} 
                                spacing={2}
                            >
                                <Grid item xs={12} style={{ color: "red"}}>
                                    <Input 
                                        required 
                                        fullWidth 
                                        placeholder="Product Name" 
                                        name="prodName"
                                        color='secondary' 
                                        variant="outlined" 
                                        onChange={(event) => this.handleInput(event)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Input 
                                        required 
                                        fullWidth 
                                        multiline 
                                        name="prodDesc"
                                        color="secondary" 
                                        variant="filled" 
                                        placeholder="Product Description" 
                                        onChange={(event) => this.handleInput(event)}/>
                                </Grid>
                            </Grid>
                            <br />
                            <center>
                                <Grid 
                                    container 
                                    color="secondary" 
                                    className="form-grid" 
                                    justifyContent="center">
                                    <Grid item xs={6}>
                                        <Input
                                            required 
                                            placeholder="Product Price"  
                                            name="prodPrice"
                                            type="number"
                                            inputProps={{
                                                min: 1,
                                                pattern: "[0-9]*"
                                            }}
                                            onChange={(event) => this.handleInput(event)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Input 
                                            required 
                                            color="secondary" 
                                            placeholder="Product Quantity" 
                                            name="prodQty"
                                            type="number"
                                            inputProps={{
                                                min: 1,
                                                pattern: "[0-9]*"
                                            }}
                                            onChange={(event) => this.handleInput(event)} 
                                        />
                                    </Grid>
                                </Grid>
                            </center>
                        </DialogContentText>
                    </DialogContent>
                    <center>
                        <div style={{ paddingBottom: "10px", paddingTop: "10px"}}>
                            <DialogActions>
                                <Grid 
                                    container 
                                    color="secondary" 
                                    className="form-grid"  
                                    justifyContent="center">
                                    <Grid item xs={3}>
                                        <Button 
                                            variant="contained" 
                                            className="nf-button" 
                                            color="primary" 
                                            type="submit">Create</Button>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button 
                                            variant="contained" 
                                            className="nf-button" 
                                            color="primary" 
                                            onClick={this.props.closePopup}>Close</Button>
                                    </Grid> 
                                </Grid>
                            </DialogActions>
                        </div>
                    </center>
                </form>
            </Dialog>
        )
    }
};