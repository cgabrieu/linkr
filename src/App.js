import React, { useState } from 'react';
import UserContext from "./contexts/UserContext";
import ExpandableMenuContext from './contexts/ExpandableMenuContext';
import GlobalStyle from "./styles/global";
import TimelineRoute from './routes/private/TimelineRoute/TimelineRoute';
import HashtagRoute from './routes/private/HashtagRoute/HashtagRoute';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from './components/Header/Header';
import TrendingHashtags from './components/TrendingHastags/TrendingHashtags'
import SignUpRoute from './routes/public/SingUpRoute/SignUpRoute';
import LogInRoute from './routes/public/LoginRoute/LoginRoute';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const [user, setUser] = useState("");
  const [isExpandableMenuOpen, setIsExpandableMenuOpen] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/sign-up" component={SignUpRoute} />
          <Route exact path="/" component={LogInRoute} />
          <ExpandableMenuContext.Provider value={{ isExpandableMenuOpen, setIsExpandableMenuOpen }}>
            <Header />
            <div onClick={() => setIsExpandableMenuOpen(false)}>
              <Switch>
                <PrivateRoute exact path='/timeline' component={TimelineRoute} />
                <PrivateRoute exact path='/user/:id' component={TimelineRoute/* UserRoute */} />
                <PrivateRoute exact path='/hashtag/:hashtag' component={HashtagRoute} />
                <Redirect to="/" />
              </Switch>
              <TrendingHashtags />
            </div>
          </ExpandableMenuContext.Provider>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;