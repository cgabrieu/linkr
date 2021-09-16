import React, { useState } from 'react';
import UserContext from "./contexts/UserContext";
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';

function App() {

  const [user, setUser] = useState("");

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/sign-up" component={SignUpRoute} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path="/" component={LogInRoute} />
          <Redirect to="/" />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
