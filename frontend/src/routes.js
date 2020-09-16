import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Harvest from './pages/Harvest';
import NewFarm from './pages/NewFarm';
import HarvestProfile from './pages/HarvestProfile';
import NewField from './pages/NewField';
import Field from './pages/Field';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/harvest/new" component={Harvest} />
        <Route path="/farm/new" component={NewFarm} />
        <Route path="/harvest" component={HarvestProfile} />
        <Route path="/field/new" component={NewField} />
        <Route path="/field" component={Field} />
      </Switch>
    </BrowserRouter>
  );
}
