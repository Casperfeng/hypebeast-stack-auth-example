import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';
import ExamplePage from '../pages/ExamplePage';

interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/example">
          <ExamplePage />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
