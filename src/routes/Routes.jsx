import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signin, Signup } from "../views";

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
          <Route path="/">
            <div>Home</div>
          </Route>
        </Switch>
    </Router>
  );
}
