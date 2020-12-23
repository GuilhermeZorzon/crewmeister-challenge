import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AbsencesManager from './pages/AbsencesManager';

const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={AbsencesManager}/>
        </Switch>
    </BrowserRouter>
)

export default Main;