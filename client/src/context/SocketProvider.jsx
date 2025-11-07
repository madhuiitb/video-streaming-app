import React, { useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";
import { io } from "socket.io-client";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io(import.meta.env.VITE_API_URL || "http://localhost:9090");
    setSocket(s);

    return () => s.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};