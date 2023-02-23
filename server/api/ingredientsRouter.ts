import db from "../db";
const Ingredient = db.Ingredient;
const User = db.User;

import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

/* get all ingredients
localhost:3000/api/ingredients */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredients = await Ingredient.findAll();
    return res.send(ingredients);
  } catch (error) {
    next(error);
  }
});

/* get one ingredient
localhost:3000/api/ingredients/:id */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    if (id) {
      const ingredient = await Ingredient.findByPk(id);
      res.send(ingredient);
    }
  } catch (error) {
    next(error);
  }
});

/* create one ingredient
localhost:3000/api/ingredients */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, quantity, image } = req.body;
    const newIngredient = await Ingredient.create({
      name,
      quantity,
      image,
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(501).send(error);
  }
});

/* update one ingredient
localhost:3000/api/ingredients/:id */
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const { name, quantity } = req.body;
    const updateIngredient = await Ingredient.findByPk(id);
    updateIngredient?.update({ name, quantity });
    res.sendStatus(200);
  } catch (error) {
    return res.status(501).send(error);
  }
});

/* delete an ingredient
localhost:3000/api/ingredients */
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NOTFOUNDMESSAGE = `The ingredient you are trying to delete does not exist!!`;
      const id = req.params.id;
      const ingredientToDelete = await Ingredient.findByPk(id);
      if (!ingredientToDelete) {
        throw new Error(NOTFOUNDMESSAGE);
      }
      await ingredientToDelete.destroy();
      res.sendStatus(202);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
);

export default router;
