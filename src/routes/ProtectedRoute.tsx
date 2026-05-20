import type {
  ReactNode,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {

  const {
    token,
  } = useAuth();

  const role =
    localStorage.getItem(
      "role"
    );

  /* NOT LOGGED IN */
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /* CLIENT BLOCKED FROM ADMIN */
  if (
    role === "CLIENT"
  ) {

    return (
      <Navigate
        to="/client-dashboard"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;