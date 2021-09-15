import React from 'react';
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={LogInRoute} />
        <Route exact path="/sign-up" component={SignUpRoute} />
        <Route exact path='/timeline' component={Timeline} />
      </Switch>
    </Router>
  );
}

export default App;
