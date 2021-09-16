import React, { useState } from 'react';
import UserContext from "./contexts/UserContext";
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import Header from './components/header/Header';
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';

function App() {

  const [user, setUser] = useState("");

  return (
    <Router>
<<<<<<< HEAD
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={LogInRoute} />
        <Route exact path="/sign-up" component={SignUpRoute} />
        <Route exact path='/timeline' component={Timeline} />
      </Switch>
=======
      <UserContext.Provider value={{ user, setUser }}>
        <GlobalStyle />
        <Switch>
          <Route exact path="/sign-up" component={SignUpRoute} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path="/" component={LogInRoute} />
          <Redirect to="/" />
        </Switch>
      </UserContext.Provider>
>>>>>>> 001988f7f87e3f96f2e1c7c7edf76bb724089f66
    </Router>
  );
}

export default App;
