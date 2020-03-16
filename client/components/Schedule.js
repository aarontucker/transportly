import React, { Component } from 'react';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import ScheduleTable from './ScheduleTable';

class Schedule extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
        };

        this.getScheduleDays = this.getScheduleDays.bind(this);
    }

    componentDidMount() {
        this.getScheduleDays(this);
    }

    getScheduleDays(ev) {
        Axios.get('/getScheduleDays')
            .then((response) => {
                ev.setState({ data: response.data });
            });
    }

    render() {
        return (
            <Box>
                {this.state.data.map((day) => (
                    <Box key={day} className="schedule-box">
                        <h3>Scheduled flights for day {day}</h3>
                        <ScheduleTable day={day} />
                    </Box>
                ))}
            </Box>
        );
    }
}

export default Schedule;
