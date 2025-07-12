import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",            // hoặc ["http://localhost:5173"]  (không có dấu "/")
        methods: ["GET", "POST"],
        // credentials: true     // Bật khi bạn cần gửi cookie/auth‑header
    },
});

export const getReceiverSocketId = (userId)=>{
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id)

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})

export { io, app, server };