import React from "react"; 

import Snackbar from '@material-ui/core/Snackbar';

/**
 * Component to show a toast/snackbar at the bottom of the screen after every successful transaction.
 * 
 * @author syuki
 */
export default class ToastMessage extends React.Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.props.open}
                autoHideDuration={2000}
                message="Transaction successful!"
                onClose={() => this.props.closeToastMessage()}
            />
        );
    }
};