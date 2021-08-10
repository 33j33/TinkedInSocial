import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Profile, Signin, Signup } from "../views";

export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
        </Switch>
    </Router>
  );
}
