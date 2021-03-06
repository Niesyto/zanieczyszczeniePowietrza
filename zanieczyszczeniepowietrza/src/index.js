import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './index.css'

const theme = createMuiTheme({
    palette: {
        primary: {
            dark: '#232f34',
            light: '#4a6572',
            main: '#344955'
        },
        secondary: {
            dark: '#ff6f00',
            light: '#ffe082',
            main: '#ffc107'
        },
        type: 'dark',
        text: {
            disabled: "#232f34",
            hint: "#232f34",
            icon: "#232f34",
            primary: "#232f34",
        },
        success: {
            main: '#344955'
        },
        info:{
            main: '#344955'
        },
        warning:{
            main: '#344955'
        }
    },
    typography: {
        h4: {
            fontSize: '2.125rem',
            '@media (min-width:960px)': {
                fontSize: '3rem'
            }
        },
        subtitle2: {
            fontSize: '0.875',
            fontWeight: 'bold',
            '@media (min-width:960px)': {
                fontSize: '1.125rem'
            }
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 'bold',
            '@media (min-width:960px)': {
                fontSize: '1rem'
            }
        }
    }
})

console.log(theme);
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
