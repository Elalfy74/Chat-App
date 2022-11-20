import express, { NextFunction, Request, Response } from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import config from "config";
import cors from "cors";
import { createServer } from "http";

import authRoutes from "./routes/auth";
import messageRoutes from "./routes/chat";

import io from "./utils/socket";
import { CustomError } from "./utils/global.types";

const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const server = createServer(app);
const db: string = config.get("db");

app.use(bodyParser.json());
app.use(cors(corsOption));

app.use("/auth", authRoutes);
app.use("/chat", messageRoutes);

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    // console.log(error);
    const status = error.statusCode || 500;
    const { message, data } = error;

    res.status(status).json({ message: message, data: data });
  }
);

connect(db).then((res) => {
  const ioServer = io.init(server);

  ioServer.on("connection", (socket) => {
    console.log("Client connected");
  });
  server.listen(8080, () => {
    console.log("Running at localhost:8080");
  });
});
