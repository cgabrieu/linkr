import React, { useState } from 'react';
<<<<<<< HEAD
import UserContext from "./contexts/UserContext";
=======
>>>>>>> feat/header
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import Header from './components/header/Header';
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';
import ExpandableMenuContext from './contexts/ExpandableMenuContext';

function App() {
<<<<<<< HEAD

  const [user, setUser] = useState("");
=======
  const [isExpandableMenuOpen, setIsExpandableMenuOpen] = useState(false);
>>>>>>> feat/header

  return (

    <Router>
<<<<<<< HEAD
      <GlobalStyle />
      <Switch>
        <ExpandableMenuContext.Provider value={{isExpandableMenuOpen, setIsExpandableMenuOpen}}>
          <div onClick={() => setIsExpandableMenuOpen(false)}>
            <Header />
            <Route exact path="/" component={LogInRoute} />
            <Route exact path="/sign-up" component={SignUpRoute} />
            <Route exact path='/timeline' component={Timeline} />
          </div>
        </ExpandableMenuContext.Provider>
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
