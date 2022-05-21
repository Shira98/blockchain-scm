import React from "react";

import Button from '@material-ui/core/Button';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";

import {PRODUCT_STATUSES, STATUS_ACTIONS} from './enum/ProductStatusEnum';
import ProductBatchForm from './ProductBatchForm';
import ProductDetails from './ProductDetails';
import PerformStatusAction from './PerformStatusAction';
import BatchTable from './BatchTable';
import ToastMessage from "./ToastMessage";
import TabPanel from "./TabPanel";
import { Paper } from "@material-ui/core";

const cols = [
  { field: "productName", title: "Product Name", numeric: false, align: "left" },
  { field: "productPrice", title: "Price", numeric: true, align: "left" },
  { field: "productQuantity", title: "Quantity", numeric: true, align: "left" },
  { field: "productStatus", title: "Status", numeric: false, align: "left" },
  { field: "action", title: "Action", numeric: false, align: "center" },
  { field: "productDesc", title: "Product Description", numeric: false, align: "center" },
];

/**
 * Renders the main page - Product Batches.
 * Handles toggling child components and interacts with the contracts to fetch product details.
 * 
 * @author syuki
 */
export default class Home extends React.Component {

    state = { 
        tabValue: 0,
        dataKey: null, 
        showAddBatch: false,
        showConfirmAction: false,
        showBatchDetails: false,
        productRow: null,
        actionState: null,
        productId: null,
        transactionSuccess: null
    };

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.SupplyChainLifecycle;
        const key = contract.methods.getAllProductDetails.cacheCall();
        this.setState({ dataKey: key });
    }

    getLifeCycleContract() {
        const { SupplyChainLifecycle } = this.props.drizzleState.contracts;
        return SupplyChainLifecycle;
    }

    disableActionButton(action){
        let disable = false;
        if(action != null){
        switch(action) {
            case STATUS_ACTIONS[3]:
                disable = true;
                break;
        }
        }
        return disable;
    }

    getProductDetails(contractName) {
        const productDetailsArray = contractName.getAllProductDetails[this.state.dataKey];
        let rows = [];
        if(productDetailsArray && productDetailsArray.value.length > 0){
            productDetailsArray.value.forEach(productDetails => {
                const status = PRODUCT_STATUSES[productDetails["productStatus"]];
                const action = STATUS_ACTIONS[productDetails["productStatus"]];
                const newRow = {
                    productId: productDetails["productId"],
                    productName: productDetails["productName"], 
                    productDesc: productDetails["productDesc"], 
                    productPrice: productDetails["productPrice"],
                    productQuantity: productDetails["productQuantity"],
                    consumerAddress: productDetails["consumerAddress"], 
                    currentStatusUser: productDetails["currentStatusUser"], 
                    distributorAddress: productDetails["distributorAddress"],
                    producerAddress: productDetails["producerAddress"],
                    retailerAddresses: productDetails["retailerAddresses"],
                    productStatus:  status,
                    action: action,
                    disableActionButton: this.disableActionButton(action)
                };
                rows.push(newRow);
            });
        }
        return rows;
    }

    toggleAddBatchPopUp() {
        this.setState({
            showAddBatch: !this.state.showAddBatch
        });
    }

    toggleConfirmActionPopUp(action, prodId) {
        this.setState({
            showConfirmAction: !this.state.showConfirmAction,
            actionState: action,
            productId: prodId
        });
    }

    toggleBatchDetailsPopUp(prodRow) {
        this.setState({
            showBatchDetails: !this.state.showBatchDetails,
            productRow: prodRow
        });
    }

    setTransactionSuccess(status){
        this.setState({ transactionSuccess: status});
    }

    closeToastMessage(){
        this.setState({ transactionSuccess: null});
    }

    handleTabChange(event, newTabValue){
        this.setState({ tabValue: newTabValue })
    }

    render() {
        const SupplyChainLifecycle = this.getLifeCycleContract();
        const rows = this.getProductDetails(SupplyChainLifecycle);
        const activeBatches = rows.filter((row) => !row.disableActionButton);
        const previousBatches = rows.filter((row) => row.disableActionButton);
        return (
            <Paper className="app" style={{ backgroundColor: "#92869f2f", minHeight: 600 }}>
                <AppBar 
                    id="app-bar"
                    position="static" 
                    elevation={0} 
                    color="secondary" 
                >
                    <Tabs 
                        variant="fullWidth"
                        value={this.state.tabValue} 
                        onChange={(event, value) => this.handleTabChange(event, value)}
                    >
                        <Tab label="View Active Batches" />
                        <Tab label="View History" />
                    </Tabs>
                </AppBar>
                
                <TabPanel value={this.state.tabValue} index={0} count={2}>
                    <Button variant="outlined" onClick={() => this.toggleAddBatchPopUp()}>Produce a Batch</Button>
                    <br/>
                    <br/>
                    <BatchTable 
                        rows={activeBatches} 
                        cols={cols} 
                        toggleBatchDetailsPopUp={(prodRow) => this.toggleBatchDetailsPopUp(prodRow)} 
                        toggleConfirmActionPopUp={(action, id) => this.toggleConfirmActionPopUp(action, id)}
                        emptyRowsMessage="No batches yet. Try producing a batch."
                    />
                </TabPanel>

                <TabPanel value={this.state.tabValue} index={1} count={2}>
                    <BatchTable 
                        rows={previousBatches} 
                        cols={cols} 
                        toggleBatchDetailsPopUp={(prodRow) => this.toggleBatchDetailsPopUp(prodRow)} 
                        toggleConfirmActionPopUp={(action, id) => this.toggleConfirmActionPopUp(action, id)}
                        emptyRowsMessage="No history batches yet. Try selling a batch."
                    />
                </TabPanel>

              

                {/* Pop-ups & Toasts*/}

                {this.state.showAddBatch ? 
                    <ProductBatchForm 
                    open={this.state.showAddBatch} 
                    closePopup={() => this.toggleAddBatchPopUp()}
                    contractName={this.props.drizzle.contracts.SupplyChainLifecycle}
                    currentAddress={this.props.drizzleState.accounts[0]}
                    setTransactionSuccess={(status) => this.setTransactionSuccess(status)}/>
                    : null
                }

                {this.state.showBatchDetails ? 
                    <ProductDetails 
                    open={this.state.showBatchDetails} 
                    closePopup={() => this.toggleBatchDetailsPopUp()} 
                    product={this.state.productRow}/>
                    : null
                }

                {this.state.showConfirmAction ? 
                    <PerformStatusAction 
                    open={this.state.showConfirmAction} 
                    closePopup={() => this.toggleConfirmActionPopUp()} 
                    contractName={this.props.drizzle.contracts.SupplyChainLifecycle}
                    action={this.state.actionState}
                    productId={this.state.productId}
                    currentAddress={this.props.drizzleState.accounts[0]}
                    setTransactionSuccess={(status) => this.setTransactionSuccess(status)} />
                    : null
                }

                {this.state.transactionSuccess ? 
                    <ToastMessage 
                    open={this.state.transactionSuccess} 
                    closeToastMessage={() => this.closeToastMessage()}
                    />
                    : null
                }
            </Paper>
        )
    };
};
