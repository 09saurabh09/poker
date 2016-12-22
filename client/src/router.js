import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/layouts/main-layout';

// Pages
import Loby from './components/containers/loby-container';

export default (
  <Route path="/">
    <Route component={MainLayout}>
      <IndexRoute component={Loby} />
    </Route>
  </Route>
);
