import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Earth from './Earth';
import Webgl from './Webgl';

const App = () => (
    <Switch>
        <Route exact path='/' component={Earth}/>
        <Route path='/webgl' component={Webgl}/>
    </Switch>
)

export default App;