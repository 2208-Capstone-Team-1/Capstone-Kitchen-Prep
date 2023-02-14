import express, { Express, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import apiRouter from "./api";
import dotenv from "dotenv";

dotenv.config();

const router: Express = express();

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
