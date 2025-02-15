import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Set up CORS and Socket.IO server configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
  pingTimeout: 60000, // Increase the timeout (default is 50000ms)
  pingInterval: 25000, // Ping every 25 seconds to keep the connection alive
});

// Used to store online users
const userSocketMap = {}; // {userId: [socketId1, socketId2, ...]}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    if (!userSocketMap[userId]) {
      userSocketMap[userId] = [];
    }
    userSocketMap[userId].push(socket.id);
  }

  socket.on("disconnect", (reason) => {
    console.log(`User ${userId} disconnected. Reason: ${reason}`);
    if (userId) {
      userSocketMap[userId] = userSocketMap[userId].filter((id) => id !== socket.id);
      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export server, app, and io instance
export { io, app, server };
