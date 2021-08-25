import { Spin } from "antd";
import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { fetchCommonData } from "../redux/global/commonData.actions";
import PrivateRoute from "./PrivateRoutes";
// const Signin = lazy(() => import("../views/Signin/Signin"));
// const Signup = lazy(() => import("../views/Signup/Signup"));
// const Home = lazy(() => import("../views/Home/Home"));
// const Profile = lazy(() => import("../views/Profile/Profile"));
// const TagFeed = lazy(() => import("../views/TagFeed/TagFeed"));
import Signin from "../views/Signin/Signin";
import Signup from "../views/Signup/Signup";
import Home from "../views/Home/Home";
import Profile from "../views/Profile/Profile";
import TagFeed from "../views/TagFeed/TagFeed";

export default function Routes() {
  const commonDataLoader = useSelector(
    (state) => state.loaders["commonData/fetch"]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCommonData());
  }, []);

  if (commonDataLoader || commonDataLoader === undefined) {

    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  } else {
    
    return (
      // <Suspense fallback={<Spinner/>}>
      <Router>
        <Switch>
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/posts/:tag" component={TagFeed} />
          <Route exact path="/user/:empId" component={Profile} />
          <Route path="*" render={() => (<Redirect to="/home" />)} /> 
        </Switch>
      </Router>
      // </Suspense>
    );
  }
}
