// PublicRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';

const auth = firebase.auth();

const PublicRoute = ({ element: Component, restricted = false, ...rest }) => {
  const [user] = useAuthState(auth);

  return user && restricted ? (
    <Navigate to="/dashboard" />
  ) : (
    <Component {...rest} />
  );
};

export default PublicRoute;