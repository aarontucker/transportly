import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class RouteButton extends Component {
    render() {
        return (
            <Button className="route-button" variant="contained" size="small" color="primary" component={Link} to={{ pathname: this.props.pathname }}>
                {this.props.buttonText}
            </Button>
        );
    }
}

export default RouteButton;
