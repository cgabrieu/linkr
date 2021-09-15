import React, { useState } from 'react';
import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Timeline from './routes/private/Timeline';
import Header from './components/header/Header';

function App() {
  const [clicked, setClicked] = useState(false)

  return (
    <div onClick={() => setClicked(false)}>
      <Router>
        <GlobalStyle />
        <Header clicked={clicked} setClicked={setClicked} />
        <Switch>
          <Route exact path='/timeline' component={Timeline} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
