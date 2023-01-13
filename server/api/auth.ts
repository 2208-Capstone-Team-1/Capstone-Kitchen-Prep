import db from "../db";
const User = db.User;

import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

/**
 * Get user based on token
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.send(await (User as any).findByToken(req.headers.authorization));
  } catch (error) {
    next(error);
  }
});

/**
 * Authenticate User
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res.send(await (User as any).authenticate(req.body));
  } catch (error) {
    next(error);
  }
});

export default router;
