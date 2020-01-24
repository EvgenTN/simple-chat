import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "./context/firebase/firebaseContext";

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(FirebaseContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};