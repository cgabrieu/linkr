import React, { useState } from 'react';
import UserContext from "./contexts/UserContext";
import GlobalStyle from "./styles/global";
import TimelineRoute from './routes/private/TimelineRoute/TimelineRoute';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {

  const [user, setUser] = useState("");

  return (
    <Router>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/sign-up" component={SignUpRoute} />
          <Route exact path="/" component={LogInRoute} />
          <Switch>
            {/* Aqui entra o header do marcio */}
            <PrivateRoute exact path='/timeline' component={TimelineRoute} />
            <PrivateRoute exact path='/user/:id' component={TimelineRoute/* UserRoute */} />
            <Redirect to="/" />
          </Switch>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;