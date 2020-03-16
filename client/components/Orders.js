import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import OrderTable from './OrderTable';
import ScheduleButton from './buttons/ScheduleButton';

export default class Orders extends Component {
    render() {
        return (
            <Box>
                <ScheduleButton />
                <h3>Orders</h3>
                <OrderTable />
            </Box>
        );
    }
}
