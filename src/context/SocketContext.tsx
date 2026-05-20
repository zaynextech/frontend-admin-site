import {
  createContext,
  useContext,
} from "react";

import {
  io,
  Socket,
} from "socket.io-client";

interface SocketContextType {
  socket: Socket;
}

const socket =
  io(
    import.meta.env
      .VITE_SOCKET_URL,
    {
      transports: [
        "websocket",
      ],
    }
  );

const SocketContext =
  createContext<
    SocketContextType
  >({
    socket,
  });

export const SocketProvider =
  ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

    return (
      <SocketContext.Provider
        value={{
          socket,
        }}
      >
        {children}
      </SocketContext.Provider>
    );
  };

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket =
  () => {
    return useContext(
      SocketContext
    );
  };