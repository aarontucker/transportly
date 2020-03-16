import React, { Component } from 'react';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class OrderTable extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
        };

        this.getOrderData = this.getOrderData.bind(this);
    }

    componentDidMount() {
        this.getOrderData(this);
    }

    getOrderData(ev, day) {
        Axios.get('/getOrders')
            .then((response) => {
                ev.setState({ data: response.data });
            });
    }

    render() {
        return (
            <TableContainer component={Paper} className="container">
                <Table stickyHeader aria-label="order table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell align="right">Flight</TableCell>
                            <TableCell align="right">Departure</TableCell>
                            <TableCell align="right">Arrival</TableCell>
                            <TableCell align="right">Day</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.data.map((order) => (
                                <TableRow hover key={order.order}>
                                    <TableCell>{order.order}</TableCell>
                                    <TableCell align="right">{order.flight_number ? order.flight_number : 'Not scheduled'}</TableCell>
                                    <TableCell align="right">{order.departure_city}</TableCell>
                                    <TableCell align="right">{order.arrival_city}</TableCell>
                                    <TableCell align="right">{order.day ? order.day : 'Not scheduled'}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default OrderTable;
