import db from "../db";
const User = db.User;
import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

// get all users
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});
export default router;
