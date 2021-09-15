import React from 'react';
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TimelineRoute from './routes/private/TimelineRoute/TimelineRoute';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path='/timeline' component={TimelineRoute} />
      </Switch>
    </Router>
  );
}

export default App;
