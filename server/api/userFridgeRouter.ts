import express, { NextFunction, Request, Response } from "express";
import db from "../db";

const User = db.User;
const Ingredient = db.Ingredient;
const Recipe = db.Recipe;
const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const userFridge = req.body.userFridge;
    const findFridgeOfUserId = await Ingredient.findAll();
    res.send(findFridgeOfUserId);
  } catch (err) {
    return res.status(501).send(err);
  }
});

export default router;
