import React from 'react';
import { Route, IndexRoute } from 'react-router';


import App from './App';
import OtherPage from './Otherpage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="/otherpage" component={OtherPage} />
  </Route>
);
