import React, { useState } from 'react';
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import Header from './components/header/Header';
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';
import ExpandableMenuContext from './contexts/ExpandableMenuContext';

function App() {
  const [isExpandableMenuOpen, setIsExpandableMenuOpen] = useState(false);

  return (

    <Router>
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
    </Router>
  );
}

export default App;
