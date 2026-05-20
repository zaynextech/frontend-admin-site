import {
  useMemo,
  useState,
} from "react";

import {
  AuthContext,
} from "./auth-context";

const savedUser =
  localStorage.getItem(
    "user"
  );

const savedToken =
  localStorage.getItem(
    "token"
  );

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] =
    useState(
      savedUser
        ? JSON.parse(savedUser)
        : null
    );

  const [token, setToken] =
    useState<string | null>(
      savedToken || null
    );

  const login = (
    userData: {
      id: string;

      fullName: string;

      email: string;

      role: string;
    },

    jwt: string
  ) => {

    setUser(userData);

    setToken(jwt);

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );

    localStorage.setItem(
      "token",
      jwt
    );

    localStorage.setItem(
      "role",
      userData.role
    );
  };

  const logout = () => {

    setUser(null);

    setToken(null);

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );
  };

  const value =
    useMemo(
      () => ({
        user,
        token,
        login,
        logout,
      }),
      [user, token]
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};