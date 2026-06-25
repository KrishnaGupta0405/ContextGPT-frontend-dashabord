"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { getSocket } from "@/lib/socket";

const ChattingSocketContext = createContext(null);

export function ChattingSocketProvider({ children }) {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const addListener = useCallback((eventType, cb) => {
    const socket = socketRef.current;
    if (!socket) return () => {};
    socket.on(eventType, cb);
    return () => socket.off(eventType, cb);
  }, []);

  // Translates old WS protocol to Socket.IO emit
  // { type: "subscribe:chatbot", chatbotId: "abc" } → socket.emit("subscribe:chatbot", "abc")
  const send = useCallback((msg) => {
    const socket = socketRef.current;
    if (!socket?.connected) return;
    const { type, ...rest } = msg;
    const value = rest.chatbotId || rest.threadId || rest;
    socket.emit(type, value);
  }, []);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;
    socket.connect();

    // Seed state immediately in case the socket was already connected
    // before this provider (re)mounted — the "connect" event won't re-fire
    // for an already-open socket, so without this isConnected stays false.
    if (socket.connected) setIsConnected(true);

    socket.on("connect", () => {
      console.log("[ChattingSocket] connected, id=", socket.id);
      setIsConnected(true);
    });
    socket.on("disconnect", (reason) => {
      console.log("[ChattingSocket] disconnected, reason=", reason);
      setIsConnected(false);
    });
    socket.on("connect_error", (err) => {
      console.error("[ChattingSocket] connect_error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, []);

  return (
    <ChattingSocketContext.Provider value={{ isConnected, send, addListener }}>
      {children}
    </ChattingSocketContext.Provider>
  );
}

export function useChattingSocket() {
  return useContext(ChattingSocketContext);
}
