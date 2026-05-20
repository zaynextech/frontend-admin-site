import { createContext } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;

  token: string | null;

  login: (
    user: User,
    token: string
  ) => void;

  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);