import { useEffect } from "react";

import AdminRouter from "./routes/AdminRouter";

import { socket } from "./socket/socket";

function App() {

  useEffect(() => {
    
    socket.on("connect", () => {
      console.log("Admin connected:", socket.id);
    });
    socket.emit("join_room", "project_test_123");

    return () => {
      socket.off("connect");
    };

  }, []);

  return <AdminRouter />;
}

export default App;