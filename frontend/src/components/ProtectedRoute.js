import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, ...rest  }) => {
  return (
    <Route {...rest} render={props => rest.loggedIn === true ? <Component {...props} {...rest} /> : <Redirect to="./sign-in" />} />
)}

