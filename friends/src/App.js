import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import Login from "./components/Login";
import FriendsList from "./components/FriendsList";
import PrivateRoute from "./components/PrivateRoute";
import AddFriendForm from "./components/AddFriendForm";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">Login</Link> */}
        <Link to="/friends">Friends List</Link>
        <Link to="/add-friend">Add Friend</Link>

        <Switch>
          <PrivateRoute exact path="/friends" component={FriendsList} />
          <PrivateRoute exact path="/add-friend" component={AddFriendForm} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
