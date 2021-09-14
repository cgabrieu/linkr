import React from 'react';
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Timeline from './routes/private/Timeline';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path='/timeline' component={Timeline} />
      </Switch>
    </Router>
  );
}

export default App;
