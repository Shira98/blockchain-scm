import React from "react";
import { Navigate } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";

import AddIcon from '@material-ui/icons/Add';

import {PRODUCT_STATUSES, STATUS_ACTIONS} from './enum/ProductStatusEnum';
import {USER_TYPES} from './enum/UsersEnum';

import ProductBatchForm from './ProductBatchForm';
import ProductDetails from './ProductDetails';
import PerformStatusAction from './PerformStatusAction';
import BatchTable from './BatchTable';
import ToastMessage from "./ToastMessage";
import TabPanel from "./TabPanel";
import ErrorBoundary from "./ErrorBoundary";

import { CircularPageLoader } from "./static/CircularPageLoader";

import "../css/App.css";

const cols = [
  { field: "productID", title: "Product ID", numeric: true, align: "left" },
  { field: "productName", title: "Product Name", numeric: false, align: "left" },
  { field: "productStatus", title: "Status", numeric: false, align: "left" },
  { field: "action", title: "Action", numeric: false, align: "center" },
  { field: "productDesc", title: "Additional Details", numeric: false, align: "center" },
];

/**
 * Renders the main page - Product Batches, for registered users.
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
        showLoader: false,
        productRow: null,
        actionState: null,
        productId: null,
        transactionSuccess: null,
        retailerDataKey: null,
        isAuthenticated: null,
        addressZero: "0x0000000000000000000000000000000000000000"
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
                case STATUS_ACTIONS[7]:
                    disable = true;
                    break;
            }
        }
        return disable;
    }

    //Maps available actions based on product statuses for each user type.
    fetchProductStatusActions(productDetails){
        let statusAction = STATUS_ACTIONS[productDetails["productStatus"]];
        if(this.props.userType == USER_TYPES[0]){
            if(productDetails["productStatus"] > 0){
                statusAction = STATUS_ACTIONS[7];
            }
        }
        if(this.props.userType == USER_TYPES[1]){
            if(productDetails["productStatus"] == 2){
                statusAction = STATUS_ACTIONS[5];
            }
            else if(productDetails["productStatus"] == 6 
                && productDetails["retailerAddresses"] == this.state.addressZero){
                statusAction = STATUS_ACTIONS[2];
            } else if(productDetails["productStatus"] > 2){
                statusAction = STATUS_ACTIONS[7];
            }
        }
        if(this.props.userType == USER_TYPES[2]){
            if(productDetails["productStatus"] == 4
                && productDetails["retailerAddresses"] != this.state.addressZero){
                statusAction = STATUS_ACTIONS[5];
            } else if (productDetails["productStatus"] == 6 
                        && productDetails["retailerAddresses"] != this.state.addressZero){
                statusAction = STATUS_ACTIONS[4];
            } else if (productDetails["productStatus"] == 5){
                statusAction = STATUS_ACTIONS[6];
            } else if(productDetails["productStatus"] > 6) {
                statusAction = STATUS_ACTIONS[7];
            }
        }
        return statusAction;
    }

    //Maps the required product statuses for each user type.
    fetchProductStatuses(productDetails) {
        let productStatuses = PRODUCT_STATUSES[productDetails["productStatus"]];
        //Abstracts all statuses after payment to SOLD. 
        if(this.props.userType == USER_TYPES[0]){
            if(productDetails["productStatus"] > 2) {
                productStatuses = PRODUCT_STATUSES[7];
            }
        }
        if(this.props.userType == USER_TYPES[1]){
            //Manages payment statuses - PAID and SOLD, depending on the user type.
            if(productDetails["productStatus"] == 6 
                && productDetails["retailerAddresses"] == this.state.addressZero){
                productStatuses = PRODUCT_STATUSES[6];
            } 
            //Abstracts all statuses after payment to SOLD. 
            else if(productDetails["productStatus"] > 4 
                && productDetails["retailerAddresses"] != this.state.addressZero){
                productStatuses = PRODUCT_STATUSES[7];
            }
        }
        return productStatuses;
    }

    convertToDecimal(number) {
        return number/100;
    }

    getProductDetails(contractName) {
        const productDetailsArray = contractName.getAllProductDetails[this.state.dataKey];
        let rows = [];
        if(productDetailsArray && productDetailsArray.value.length > 0){
            productDetailsArray.value.forEach(productDetails => {
                const status = this.fetchProductStatuses(productDetails);
                const action = this.fetchProductStatusActions(productDetails);
                const newRow = {
                    productId: productDetails["productId"],
                    productName: productDetails["productName"], 
                    productDesc: productDetails["productDesc"], 
                    productPrice: this.convertToDecimal(productDetails["productPrice"]),
                    productQuantity: productDetails["productQuantity"],
                    consumerAddress: productDetails["consumerAddress"], 
                    currentUser: productDetails["currentStatusUser"], 
                    distributorAddress: productDetails["distributorAddress"],
                    producerAddress: productDetails["producerAddress"],
                    retailerAddresses: productDetails["retailerAddresses"],
                    productStatus: status,
                    action: action,
                    disableActionButton: this.disableActionButton(action)
                };
                rows.push(newRow);
            });
        }
        return rows;
    }

    fetchActiveBatches(rows) {
        //Non-active batches for producers = Sold batches. 
        if(this.props.userType == USER_TYPES[0]){
            return rows.filter((row) => row.productStatus != PRODUCT_STATUSES[7]).reverse();
        }
        //Non-active and unrelated batches for distributor = Sold batches and batches yet to be 
        //enabled for pickup. 
        if(this.props.userType == USER_TYPES[1]){
            return rows.filter((row) => row.productStatus != PRODUCT_STATUSES[0] 
                                        && row.productStatus != PRODUCT_STATUSES[7]).reverse();
        }
        //Non-active and unrelated batches for retailer = Sold batches and batches yet to be 
        //released for shipping. 
        if(this.props.userType == USER_TYPES[2]){
            return rows.filter((row) => row.productStatus != PRODUCT_STATUSES[0]
                                        && row.productStatus != PRODUCT_STATUSES[1]
                                        && row.productStatus != PRODUCT_STATUSES[2]
                                        && row.productStatus != PRODUCT_STATUSES[7]).reverse();
        }
        return rows.filter((row) => !row.disableActionButton).reverse();
    }

    //Filters all the sold batches for all of the user types.
    fetchPreviousBatches(rows) {
        return rows.filter((row) => row.productStatus == PRODUCT_STATUSES[7]).reverse();
    }

    showAddBatchPopUp() {
        this.setState({
            showAddBatch: true
        });
    }

    hideAddBatchPopUp() {
        this.setState({
            showAddBatch: false
        });
    }

    showConfirmActionPopUp(action, prodId) {
        this.setState({
            showConfirmAction: true,
            actionState: action,
            productId: prodId
        });
    }

    hideConfirmActionPopUp(action, prodId) {
        this.setState({
            showConfirmAction: false
        });
    }

    toggleBatchDetailsPopUp(prodRow) {
        this.setState({
            showBatchDetails: !this.state.showBatchDetails,
            productRow: prodRow
        });
    }

    showLoader(){
        this.setState({
            showLoader: true
        });
    }

    hideLoader(){
        this.setState({
            showLoader: false
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

    fetchEmptyTableString(){
        let string = "No batches available yet. ";
        if(this.props.userType == USER_TYPES[0]){
            string+="Try producing a batch.";
        } else {
            string = "No batches available for buying yet.";
        }
        return string;
    }

    render() {
        if(this.props.isAuthenticated || this.props.isSuccessfullyRegistered) {
            //Updates registration state globally to render header and footer.
            this.props.updateAuth(true);

            //Updates user type for new user registration.
            if(this.props.newUserType){
                this.props.updateUserType(this.props.newUserType);
            }

            const SupplyChainLifecycle = this.getLifeCycleContract();
            const rows = this.getProductDetails(SupplyChainLifecycle);
            const activeBatches = this.fetchActiveBatches(rows);
            const previousBatches = this.fetchPreviousBatches(rows);

            return (
                <div className="main-body" color="primary">
                    <Paper className="app" style={{ backgroundColor: "#92869f63", minHeight: 600 }} elevation={3}>
                        <AppBar 
                            id="app-bar"
                            position="static" 
                            elevation={0} 
                        >
                            <Tabs 
                                variant="fullWidth"
                                value={this.state.tabValue} 
                                TabIndicatorProps={{ style: { background: "#FBFAFA" } }}
                                onChange={(event, value) => this.handleTabChange(event, value)}
                            >
                                <Tab label="View Active Batches" />
                                <Tab label="View Sold Batches" />
                            </Tabs>
                        </AppBar>
                        
                        <TabPanel value={this.state.tabValue} index={0} count={2}>
                            { this.props.userType == USER_TYPES[0] ? 
                            <div>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={() => this.showAddBatchPopUp()}>
                                        <AddIcon style={{ paddingRight: "4px", paddingTop: "1px" }} />Produce a New Batch
                                </Button>                     
                                <br/>
                                <br/>
                            </div>
                                : null
                            }
                            <BatchTable 
                                rows={activeBatches} 
                                cols={cols} 
                                userType={this.props.userType}
                                toggleBatchDetailsPopUp={(prodRow) => this.toggleBatchDetailsPopUp(prodRow)} 
                                showConfirmActionPopUp={(action, id) => this.showConfirmActionPopUp(action, id)}
                                emptyRowsMessage= {this.fetchEmptyTableString()}
                            />
                        </TabPanel>

                        <TabPanel value={this.state.tabValue} index={1} count={2}>
                            <BatchTable 
                                rows={previousBatches} 
                                cols={cols} 
                                toggleBatchDetailsPopUp={(prodRow) => this.toggleBatchDetailsPopUp(prodRow)} 
                                showConfirmActionPopUp={(action, id) => this.showConfirmActionPopUp(action, id)}
                                emptyRowsMessage="No sold batches yet. Try selling a batch."
                            />
                        </TabPanel>

                        {/* Pop-ups & Toasts*/}

                        {this.state.showAddBatch ? 
                            <ErrorBoundary 
                                hideLoaderScreen={() => this.hideLoader()} 
                                hideDialog={() => this.hideAddBatchPopUp()}
                                setTransactionSuccess={(status) => this.setTransactionSuccess(status)}
                            >
                                <ProductBatchForm 
                                    open={this.state.showAddBatch} 
                                    closePopup={() => this.hideAddBatchPopUp()}
                                    contractName={this.props.drizzle.contracts.SupplyChainLifecycle}
                                    currentAddress={this.props.drizzleState.accounts[0]}
                                    showLoaderScreen={() => this.showLoader()}
                                    hideLoaderScreen={() => this.hideLoader()}
                                    setTransactionSuccess={(status) => this.setTransactionSuccess(status)}
                                />
                            </ErrorBoundary>
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
                            <ErrorBoundary 
                                hideLoaderScreen={() => this.hideLoader()} 
                                hideDialog={() => this.hideConfirmActionPopUp()}
                                setTransactionSuccess={(status) => this.setTransactionSuccess(status)}
                            >
                                <PerformStatusAction 
                                    open={this.state.showConfirmAction} 
                                    closePopup={() => this.hideConfirmActionPopUp()} 
                                    contractName={this.props.drizzle.contracts.SupplyChainLifecycle}
                                    action={this.state.actionState}
                                    productId={this.state.productId}
                                    currentAddress={this.props.drizzleState.accounts[0]}
                                    showLoaderScreen={() => this.showLoader()}
                                    hideLoaderScreen={() => this.hideLoader()}
                                    setTransactionSuccess={(status) => this.setTransactionSuccess(status)}
                                />
                            </ErrorBoundary>
                            : null
                        }

                        {this.state.transactionSuccess ? 
                            <ToastMessage 
                                open={this.state.transactionSuccess} 
                                toastMessage="Transaction successful!"
                                closeToastMessage={() => this.closeToastMessage()}
                                bgColor='#9986af'
                            />
                            : null
                        }
                        {this.state.transactionSuccess === false ? 
                            <ToastMessage 
                                open={this.state.transactionSuccess === false} 
                                toastMessage="Transaction failed! Please check your connection and try again."
                                bgColor='#eb535e'
                                closeToastMessage={() => this.closeToastMessage()}
                            />
                            : null
                        }
                
                        <CircularPageLoader 
                            open={this.state.showLoader} 
                        />
                        
                    </Paper>
                </div>
            )
        } else {
            return <Navigate to="/new-user" replace />;
        }
    };
};
