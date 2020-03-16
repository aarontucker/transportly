import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import './css/main.css';

ReactDOM.render(
    <CssBaseline>
        <HashRouter>
            <Routes />
        </HashRouter>
    </CssBaseline>, document.getElementById('root'),
);
