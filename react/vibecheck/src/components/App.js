import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import MyProfile from "./MyProfile";
import { getUser, removeUser } from "../data/repository";

function App() {
  const [user, setUser] = useState(getUser());

  // set the global user login
  const loginUser = (user) => {
    setUser(user);
  }
// called when the user presses logged out
  const logoutUser = () => {
    removeUser();
    setUser(null);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login" render={props => (
                <Login {...props} loginUser={loginUser} />
              )} />
              <Route path="/profile">
                <MyProfile user={user} loginUser={loginUser} />
              </Route>
              <Route path="/">
                <Home user={user}/>
              </Route>
            </Switch>
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
