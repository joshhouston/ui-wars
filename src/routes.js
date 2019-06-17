import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/authorization/Landing';
import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={Registration} />
        <Route path='/login' component={Login} />
    </Switch>
)