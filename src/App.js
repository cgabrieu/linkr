import React, { useState } from "react";
import UserContext from "./contexts/UserContext";
import ExpandableMenuContext from "./contexts/ExpandableMenuContext";
import RenderPostsContext from "./contexts/RenderPostsContext";
import GlobalStyle from "./styles/global";
import TimelineRoute from "./routes/private/TimelineRoute/TimelineRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header/Header";
import TrendingHashtags from "./components/TrendingHastags/TrendingHashtags";
import SignUpRoute from "./routes/public/SingUpRoute/SignUpRoute";
import LogInRoute from "./routes/public/LoginRoute/LoginRoute";
import PrivateRoute from "./routes/PrivateRoute";
import UserPostsRoute from "./routes/private/UserPostsRoute/UserPostsRoute";
import MyPostsRoute from "./routes/private/MyPostsRoute/MyPostsRoute";
import HashtagRoute from "./routes/private/HashtagRoute/HashtagRoute";
import MyLikesRoute from "./routes/private/MyLikesRoute/MyLikesRoute";

function App() {
  const [user, setUser] = useState("");
  const [isExpandableMenuOpen, setIsExpandableMenuOpen] = useState(false);
  const [renderPosts, setRenderPosts] = useState(null);

  return (
    <Router>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/sign-up" component={SignUpRoute} />
          <Route exact path="/" component={LogInRoute} />
          <RenderPostsContext.Provider value={{ renderPosts, setRenderPosts }}>
            <ExpandableMenuContext.Provider value={{ isExpandableMenuOpen, setIsExpandableMenuOpen }}>
              <div onClick={() => setIsExpandableMenuOpen(false)}>
                <Header />
                <Switch>
                  <PrivateRoute exact path="/timeline" component={TimelineRoute} />
                  <PrivateRoute exact path="/user/:id" component={UserPostsRoute} />
                  <PrivateRoute exact path="/hashtag/:hashtag" component={HashtagRoute} />
                  <PrivateRoute exact path="/my-posts" component={MyPostsRoute} />
                  <PrivateRoute exact path="/my-likes" component={MyLikesRoute} />
                  <Redirect to="/" />
                </Switch>
                <TrendingHashtags />
              </div>
            </ExpandableMenuContext.Provider>
          </RenderPostsContext.Provider>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
