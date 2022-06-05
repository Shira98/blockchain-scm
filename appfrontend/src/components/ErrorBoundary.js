import React from 'react';

/**
 * Generic error handling component.
 * Triggers an error toast.
 * 
 * @author syuki
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        this.props.setTransactionSuccess(false);
        this.props.hideLoaderScreen();
        this.props.hideDialog();
        return { hasError: true };
      }

    promiseRejectionHandler = (event) => {
        console.log("within promise handler");
        this.setState({
            hasError: true,
        });
        this.props.setTransactionSuccess(false);
        this.props.hideLoaderScreen();
        this.props.hideDialog();
    }

    componentDidCatch(error, info) {
        this.setState({
            hasError: true,
        });
        this.props.setTransactionSuccess(false);
        this.props.hideLoaderScreen();
        this.props.hideDialog();
    }

    componentDidMount() {
        window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
    }

    componentWillUnmount() {
        console.log("From within the error boundary willUnmount.");
        window.removeEventListener('unhandledrejection', this.promiseRejectionHandler);
    }
    
    render() {
        console.log("within render: " + this.state.hasError);
        console.log("within render, failure toast value: " + this.state.showFailureToast);
        if (this.state.hasError) {
            return ('');
        }
        return this.props.children;
    }
}

export default ErrorBoundary;  