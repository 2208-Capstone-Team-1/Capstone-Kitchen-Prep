import express, { NextFunction, Request, Response } from "express";
import db from "../db";

const User = db.User;
const Ingredient = db.Ingredient;
const Recipe = db.Recipe;
const router = express.Router();

/* get all users
 localhost:3000/api/users
*/
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

/* get  a user by id
localhost:3000/api/users/:id
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    if (id) {
      const user = await User.findByPk(id, {
        include: [Ingredient, Recipe],
      });
      res.send(user);
    }
  } catch (error) {
    return res.status(501).send(error);
  }
});

/* add an ingredient for a specific user
localhost:3000/api/users/:id/ingredients
 */
router.post(
  "/:id/ingredients",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // find the id of the user from the URL.
      const id: string = req.params.id;
      // find the user with this id.
      const user = await User.findByPk(id, {
        include: [Ingredient, Recipe],
      });
      // if user exists, then create the ingredient.
      if (user) {
        const { name, quantity, image } = req.body;
        const newIngredient = await Ingredient.create({
          name,
          quantity,
          image,
        });

        // Use magic method to add the ingredient to the specific user.
        (user as any).addIngredient(newIngredient);
        res.send(newIngredient);
      }
    } catch (error) {
      return res.status(501).send(error);
    }
  }
);

/* add a recipe for a specific user
localhost:3000/api/users/:id/recipe
 */
router.post(
  "/:id/recipes",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // find the id of the user from the URL.
      const id: string = req.params.id;
      // find the user with this id.
      const user = await User.findByPk(id, {
        include: [Ingredient, Recipe],
      });
      // if user exists, then create the recipe.
      if (user) {
        const { name, url, personal_note, calories } = req.body;
        const newRecipe = await Recipe.create({
          name,
          url,
          personal_note,
          calories,
        });

        // Use magic method to add the ingredient to the specific user.
        (user as any).addRecipe(newRecipe);
        res.send(newRecipe);
      }
    } catch (error) {
      return res.status(501).send(error);
    }
  }
);

/* create a new user
localhost:3000/api/users */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, password, email, phoneNumber, isAdmin } =
      req.body;
    const newUser = await User.create({
      first_name,
      last_name,
      password,
      email,
      phoneNumber,
      isAdmin,
    });
    res.send(newUser);
  } catch (error) {
    return res.status(501).send(error);
  }
});

/* update a user
localhost:3000/api/users/:id */
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { first_name, last_name, password, email, phoneNumber, isAdmin } =
      req.body;
    const user = await User.findByPk(id);
    user?.update({
      first_name,
      last_name,
      password,
      email,
      phoneNumber,
      isAdmin,
    });
    res.sendStatus(200);
  } catch (error) {
    return res.status(501).send(error);
  }
});

/* delete a new user
localhost:3000/api/users/:id */
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NOTFOUNDMESSAGE = `The user you are trying to delete does not exist!!`;
      const id = req.params.id;
      const userToDelete = await User.findByPk(id);
      if (!userToDelete) {
        throw new Error(NOTFOUNDMESSAGE);
      }
      await userToDelete.destroy();
      res.sendStatus(202);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
);

export default router;
