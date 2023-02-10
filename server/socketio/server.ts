export {};
// import express from "express";
// import { ServerSocket } from "./socket";

// const application = express();
// const http = require("http").createServer();

// /** Server Handling */
// const httpServer = http.createServer(application);

// /** Start Socket */

// const io = require("socket.io")(http, {
//   cors: { origin: "*" },
// });

// io.on("connection", (socket: any) => {
//   console.log("a user connected");

//   socket.on("message", (message: any) => {
//     console.log(message);
//     io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
//   });
// });

// /** Log the request */
// application.use((req, res, next) => {
//   console.info(
//     `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
//   );

//   res.on("finish", () => {
//     console.info(
//       `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
//     );
//   });

//   next();
// });

// /** Parse the body of the request */
// application.use(express.urlencoded({ extended: true }));
// application.use(express.json());

// /** Rules of our API */
// application.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method == "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }

//   next();
// });

// /** Healthcheck */
// application.get("/ping", (req, res, next) => {
//   return res.status(200).json({ hello: "world!" });
// });

// /** Socket Information */
// application.get("/status", (req, res, next) => {
//   return res.status(200).json({ users: ServerSocket.instance.users });
// });

// /** Error handling */
// application.use((req, res, next) => {
//   const error = new Error("Not found");

//   res.status(404).json({
//     message: error.message,
//   });
// });

// /** Listen */
// httpServer.listen(1337, () => console.info(`Server is running`));
