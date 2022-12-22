import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    },
    
    palette: {
        background: {
            default: "#d4ccdd"
        },
        text: {
            primary: "#2D323F",
            secondary: "#FBFAFA",
        },
        primary: {
            main: "#92869F",
            text: "black",
        },
        secondary: {
            main: "#2D323F",
            text: "#FBFAFA"
        },
        info: {
            main: "#EDB043" 
        },
        warning: {
            main: "#938294"
        } 
    }
});

ReactDOM.render(
<ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
</ThemeProvider>, 
document.getElementById('root'));

window.ethereum.on('accountsChanged',async (accounts) =>{
    window.location.reload(false);
    window.history.replaceState({}, document.title);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
