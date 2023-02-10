import express, { Express, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import apiRouter from "./api";

const router: Express = express();
const http = require("http").createServer(router);
const { Server } = require("socket.io");
const io = new Server(http);
/** Start Socket */
// const io = require("socket.io")(http, {
//   cors: { origin: "*" },
// });

console.log("🍊orange");

io.on("connection", (socket: any) => {
  console.log("********  a user connected  *********");

  socket.on("message", (message: any) => {
    console.log(message);
    io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
  });
});

// Body parsing middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Set up middleware
router.use(morgan("tiny"));
router.use(express.json());

// Set up routes
router.use("/api", apiRouter);

// Pass back everything else / front-end
router.use("/dist", express.static(path.join(__dirname, "../dist")));
router.use("/static", express.static(path.join(__dirname, "../static")));
router.get("/*", (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

export default router;
