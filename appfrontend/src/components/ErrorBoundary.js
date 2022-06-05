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
        window.removeEventListener('unhandledrejection', this.promiseRejectionHandler);
    }
    
    render() {
        if (this.state.hasError) {
            return ('');
        }
        return this.props.children;
    }
}

export default ErrorBoundary;  