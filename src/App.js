import React, { useState } from 'react';
import UserContext from "./contexts/UserContext";
import ExpandableMenuContext from './contexts/ExpandableMenuContext';
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import Header from './components/header/Header';
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';

function App() {
  const [user, setUser] = useState("");
  const [isExpandableMenuOpen, setIsExpandableMenuOpen] = useState(false);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <GlobalStyle />
        <Switch>
          <ExpandableMenuContext.Provider value={{ isExpandableMenuOpen, setIsExpandableMenuOpen }}>
            <div onClick={() => setIsExpandableMenuOpen(false)}>
              <Route exact path="/sign-up" component={SignUpRoute} />
              <Route exact path='/timeline' component={Timeline} />
              <Route exact path="/" component={LogInRoute} />
              <Redirect to="/" />
            </div>
          </ExpandableMenuContext.Provider>
        </Switch>

      </UserContext.Provider>
    </Router>
  );
}

export default App;
