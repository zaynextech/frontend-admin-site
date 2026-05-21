import { io } from "socket.io-client";

/*
  Example:
  
  VITE_API_URL=https://api.zaynex.tech/api
  VITE_API_URL=http://localhost:5000/api
*/

const API_URL = import.meta.env.VITE_API_URL;

/* Remove only trailing /api */
const SOCKET_URL = API_URL.replace(/\/api$/, "");

export const socket = io(SOCKET_URL, {
  path: "/socket.io",
  transports: ["websocket", "polling"],
  withCredentials: true,
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});