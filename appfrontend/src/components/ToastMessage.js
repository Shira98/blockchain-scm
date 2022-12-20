import React from "react"; 

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

/**
 * Component to show a toast/snackbar at the bottom of the screen after every transaction.
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
                autoHideDuration={3000}
                onClose={() => this.props.closeToastMessage()}
            >
                <SnackbarContent 
                    message={this.props.toastMessage}
                    style={{
                        backgroundColor:this.props.bgColor,
                    }}
                    action= {
                          <IconButton size="small" aria-label="close" color="inherit" onClick={() => this.props.closeToastMessage()}>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                      }
                />
            </Snackbar>
        );
    }
};