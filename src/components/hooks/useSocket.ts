import { useEffect, useRef, useState } from "react";
import socketIOClient, {
  ManagerOptions,
  SocketOptions,
  Socket,
} from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}
interface ClientToServerEvents {
  hello: () => void;
}

export const useSocket = (
  options?: Partial<ManagerOptions & SocketOptions> | undefined
): Socket | undefined => {
  // const { current: socket } = useRef(io(url, options));
  const socketRef =
    useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    // Creates a WebSocket connection
    const socket = socketIOClient(SOCKET_SERVER_URL);
    if (socket) {
      socketRef.current = socket as Socket<
        ServerToClientEvents,
        ClientToServerEvents
      >;
    }

    // Listens for incoming messages
    // socketRef.current.on("user_connected", (message) => {
    //   const incomingMessage = {
    //     ...message,
    //     ownedByCurrentUser: message.senderId === socketRef.current.id,
    //   };
    //   setMessages((messages) => [...messages, incomingMessage]);
    // });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return socketRef.current;
};
