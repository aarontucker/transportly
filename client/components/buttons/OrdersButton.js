import React, { Component } from 'react';
import RouteButton from './RouteButton';

class OrdersButton extends Component {
    render() {
        return (
            <RouteButton pathname='/orders' buttonText='View order schedule' />
        );
    }
}

export default OrdersButton;
