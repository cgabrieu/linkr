import React, { useState } from 'react';
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import Header from './components/header/Header';
import ExpandableMenuContext from './contexts/ExpandableMenuContext';

function App() {
  const [clicked, setClicked] = useState(false)

  return (
    <ExpandableMenuContext.provider value={{ clicked, setClicked }}>
      <div onClick={() => setClicked(false)}>
        <Router>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route exact path='/timeline' component={Timeline} />
          </Switch>
        </Router>
      </div>
    </ExpandableMenuContext.provider>
  );
}

export default App;
