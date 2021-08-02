import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Signin, Signup } from "../views";

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
        </Switch>
    </Router>
  );
}
