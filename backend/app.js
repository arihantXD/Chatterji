import "express-async-errors";
import express from "express";
import * as dotenv from "dotenv";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";

import messageRouter from "./routers/messageRouter.js";
import chatRouter from "./routers/chatRouter.js";
import userRouter from "./routers/userRouter.js";
import { dbConnection } from "./config/dbConnection.js";
import { data } from "./config/mockData.js";
import User from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

app.get("/api/setdata", async (req, res) => {
  const datas = data;
  for (let data of datas) {
    await User.create({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }
  res.json("created");
});

app.use("/api/messages", messageRouter);
app.use("/api/chats", chatRouter);
app.use("/api/auth", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "something went wrong" });
});

const server = app.listen(process.env.PORT || 3000, async (req, res) => {
  dbConnection();
  console.log("Server listening on port", 3000);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("joinRoom", () => {
    socket.join(1234);
    console.log("user joined room");
  });
  socket.on("offerCandidate", (data) => {
    console.log("offerCandidate");
    socket.broadcast.emit("offerCandidate", data);
  });
  socket.on("offer", (data) => {
    console.log("offer", data);
    socket.broadcast.emit("offer", data);
  });
  socket.on("answerCandidate", (data) => {
    console.log("answerCandidate", data);
    socket.broadcast.emit("answerCandidate", data);
  });
  socket.on("answer", (data) => {
    console.log("answer", data);
    socket.broadcast.emit("answer", data);
  });
  // let user, room;
  // socket.on("join-room", (roomId, userId) => {
  //   room = roomId;
  //   user = userId;
  //   console.log("user joined room");
  //   socket.join(roomId);
  //   socket.broadcast.to(roomId).emit("new-user-connected", userId);
  // });
  // socket.on("disconnect", () => {
  //   socket.broadcast.to(room).emit("user-disconnected", user);
  // });
  // socket.on("connection")
  // console.log("user connected");
  // socket.on("offer", (offer) => {
  //   console.log("the offer created is : ", offer);
  // });
  // socket.on("offerCandidate", (offerCandidate) => {
  //   console.log("the offer candidate is : ", offerCandidate);
  // });
  // socket.on("chat-room-created", (roomId) => {
  //   socket.join(roomId);
  //   console.log(`users joined room : ${roomId}`);
  // });
  // socket.on("bot", (data, chats) => {
  //   console.log(data);
  //   io.emit("hello");
  // });
  socket.on("send-new-msg", (msg, chat) => {
    for (let participant of chat.chat.participants) {
      if (msg.sender === participant) {
        continue;
      }
      io.to(participant).emit("sent-new-msg", msg);
    }
    // io.in.emit("sent-new-msg", msg);
    // console.log(chat.chat.participants);
  });
});
