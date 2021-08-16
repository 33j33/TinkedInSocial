import { Redirect, Route } from "react-router";


function PrivateRoute({ component: Component, ...rest }) {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Route
            {...rest}
            render={(props) => user
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/signin' }} />}
        />
    )
}
export default PrivateRoute;