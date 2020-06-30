import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ListContainer from './containers/ListContainer';
import Profile from './containers/profile';
import Collections from './containers/collections';
import { PrivateRoute } from './privateRoute'



const Routes = () => {
  return(
    <Switch>
      <Route exact path='/' component={Home} />
      <PrivateRoute  >
        <Route path='/search/:searchGame' component={ListContainer} />
        <Route path='/search/' component={ListContainer} />

        <Route path='/collection' component={Collections} />
        <Route path='/profile' component={Profile} />

      </PrivateRoute>
    </Switch>
  );
}

export default Routes;