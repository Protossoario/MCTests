import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddTest from './components/AddTest';
import Test from './components/Test';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/addTest' component={AddTest} />
    <Route path='/tests/:id' component={Test} />
  </Route>
);
