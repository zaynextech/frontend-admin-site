import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";

import {
  Toaster,
} from "react-hot-toast";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

   <AuthProvider>

  <SocketProvider>

    <App />

    <Toaster
      position="top-right"
    />

  </SocketProvider>

</AuthProvider>

  </React.StrictMode>
);