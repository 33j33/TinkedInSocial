import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { fetchCommonData } from "../redux/global/commonData.actions";
import { Home, Profile, Signin, Signup } from "../views";
import PrivateRoute from "./PrivateRoutes";

export default function Routes() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCommonData())
  }, []);

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
