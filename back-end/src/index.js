import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import cors from "cors"

import { connectDB } from "./lib/db.js"
import authRouter from "./routers/auth.route.js";
import messageRouter from "./routers/message.route.js";
import {app, server} from './lib/soket.js'

dotenv.config();
// const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Cho phép tất cả các origin
    callback(null, origin);
  },
  credentials: true
}));

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log("run server" + PORT);
    connectDB();
})