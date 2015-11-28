import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddTest from './components/AddTest';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/addTest' component={AddTest} />
  </Route>
);
