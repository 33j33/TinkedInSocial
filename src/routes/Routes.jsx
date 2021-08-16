import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Profile, Signin, Signup } from "../views";
import PrivateRoute from "./PrivateRoutes";

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
          <PrivateRoute path="/home"  component={Home}/>
          <PrivateRoute path="/profile" component={Profile}/>
        </Switch>
    </Router>
  );
}
