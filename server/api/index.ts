import authRouter from "./auth";
import express from "express";
const router = express.Router();

router.use("/auth", authRouter);

export default router;
