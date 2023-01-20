import authRouter from "./auth";
import chatlogRouter from "./chatlogRouter";
import ingredientsRouter from "./ingredientsRouter";
import userRouter from "./userRouter";
import recipeRouter from "./recipeRouter";
import express from "express";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/chatlogs", chatlogRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/users", userRouter);
router.use("/recipes", recipeRouter);

export default router;
