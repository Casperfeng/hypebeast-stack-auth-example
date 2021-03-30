import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import { Example } from '../pages/ExamplePage';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/example" component={Example} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/" component={Home} />
        <Route path="/" component={App}>
          <App />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
