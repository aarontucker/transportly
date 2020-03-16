import React, { Component } from 'react';
import Axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class ScheduleTable extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
        };

        this.getScheduleData = this.getScheduleData.bind(this);
    }

    componentDidMount() {
        this.getScheduleData(this, this.props.day);
    }

    getScheduleData(ev, day) {
        Axios.get(`/getScheduleByDay?day=${day}`)
            .then((response) => {
                ev.setState({ data: response.data });
            });
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="schedule table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Flight</TableCell>
                            <TableCell>Departure</TableCell>
                            <TableCell>Arrival</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            this.state.data.map((flight) => (
                                <TableRow hover key={flight.flight_number}>
                                    <TableCell>{flight.flight_number}</TableCell>
                                    <TableCell>{flight.departure_city}</TableCell>
                                    <TableCell>{flight.arrival_city}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default ScheduleTable;
