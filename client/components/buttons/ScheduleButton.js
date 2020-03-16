import React, { Component } from 'react';
import RouteButton from './RouteButton';

class ScheduleButton extends Component {
    render() {
        return (
            <RouteButton pathname='/' buttonText='View flight schedule' />
        );
    }
}

export default ScheduleButton;
