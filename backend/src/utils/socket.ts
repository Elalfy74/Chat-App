import socketio from "socket.io";
import { Server } from "http";

let io: socketio.Server | undefined;

export default {
  init: (httpServer: Server) => {
    io = new socketio.Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
