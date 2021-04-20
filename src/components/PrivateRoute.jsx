import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../state/authState';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useAuth((state) => state.currentUser);
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
