import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={() => user
                ? <Component {...rest} />
                : <Redirect to="/" />}
        />
    );
}

export default PrivateRoute;