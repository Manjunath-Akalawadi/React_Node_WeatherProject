import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from '../login/SignIn';
import SignUp from '../signup/SignUp';
import Main from '../weather/Main';
import Dashboard from '../dashboard/Dashboard';


class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/Main' component={Main} />
          <Route path='/Dashboard' component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;