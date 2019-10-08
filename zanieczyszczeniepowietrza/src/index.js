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
            light:'#4a6572',
            main:'#344955'
        },
        secondary: {
            dark: '#ff6f00',
            light:'#ffe082',
            main:'#ffc107'
        },  
        type : 'dark',
        text: {
            disabled: "#232f34",
            hint: "#232f34",
            icon: "#232f34",
            primary: "#232f34", 
        }
    },
    
   
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
