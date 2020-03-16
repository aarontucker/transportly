import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Schedule from './Schedule';
import OrdersButton from './buttons/OrdersButton';

export default class App extends Component {
    render() {
        return (
            <Box>
                <OrdersButton />
                <Schedule />
            </Box>
        );
    }
}
