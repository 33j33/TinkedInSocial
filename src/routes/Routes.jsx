import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { fetchCommonData } from "../redux/global/commonData.actions";
import PrivateRoute from "./PrivateRoutes";
const Signin = lazy(() => import("../views/Signin/Signin"));
const Signup = lazy(() => import("../views/Signup/Signup"));
const Home = lazy(() => import("../views/Home/Home"));
const Profile = lazy(() => import("../views/Profile/Profile"));
const TagFeed = lazy(() => import("../views/TagFeed/TagFeed"))

export default function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCommonData());
  }, []);

  return (
    <Suspense fallback={Spinner}>
      <Router>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/posts/:tag" component={TagFeed}/>
          <Route path="/:empId" component={Profile} />
        </Switch>
      </Router>
    </Suspense>
  );
}
