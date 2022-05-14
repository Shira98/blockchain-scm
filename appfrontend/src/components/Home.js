import React from "react";

import Button from '@material-ui/core/Button';

import {PRODUCT_STATUSES, STATUS_ACTIONS} from './enum/ProductStatusEnum';
import ProductBatchForm from './ProductBatchForm';
import ProductDetails from './ProductDetails';
import PerformStatusAction from './PerformStatusAction';
import BatchTable from './BatchTable';
import ToastMessage from "./ToastMessage";

const cols = [
  { field: "productName", title: "Product Name", numeric: false },
  { field: "productPrice", title: "Price", numeric: true },
  { field: "productQuantity", title: "Quantity", numeric: true },
  { field: "productStatus", title: "Status", numeric: false },
  { field: "action", title: "Action", numeric: false },
  { field: "productDesc", title: "Product Description", numeric: false },
];

/**
 * Renders the main page - Product Batches.
 * Handles toggling child components and interacts with the contracts to fetch product details.
 * 
 * @author syuki
 */
export default class Home extends React.Component {

    state = { 
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

    render() {
    const SupplyChainLifecycle = this.getLifeCycleContract();
    const rows = this.getProductDetails(SupplyChainLifecycle);
    const activeBatches = rows.filter((row) => !row.disableActionButton);
    const previousBatches = rows.filter((row) => row.disableActionButton);
        return (
            <div className="App">
                <h1>Produce Details</h1>
                <Button variant="outlined" onClick={() => this.toggleAddBatchPopUp()}>Produce a Batch</Button>
                <br/>
                <br/>
                <h2>Active Batches</h2> 
                <BatchTable 
                    rows={activeBatches} 
                    cols={cols} 
                    toggleBatchDetailsPopUp={(prodRow) => this.toggleBatchDetailsPopUp(prodRow)} 
                    toggleConfirmActionPopUp={(action, id) => this.toggleConfirmActionPopUp(action, id)}
                    emptyRowsMessage="No batches yet. Try producing a batch."
                />

                <br />
                <h2>Past Batches</h2> 
                <BatchTable 
                    rows={previousBatches} 
                    cols={cols} 
                    toggleBatchDetailsPopUp={(prodRow) => this.toggleBatchDetailsPopUp(prodRow)} 
                    toggleConfirmActionPopUp={(action, id) => this.toggleConfirmActionPopUp(action, id)}
                    emptyRowsMessage="No history batches yet. Try selling a batch."
                />

                {this.state.transactionSuccess ? 
                    <ToastMessage 
                    open={this.state.transactionSuccess} 
                    closeToastMessage={() => this.closeToastMessage()}
                    />
                    : null
                }

                {/* Pop-ups */}

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
            </div>
        )
    };
};
