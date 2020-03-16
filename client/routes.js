import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Orders from './components/Orders';

export const Routes = () => (
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/orders" component={Orders} />
    </Switch>
);

export default Routes;
