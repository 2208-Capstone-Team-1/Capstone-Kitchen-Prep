import db from "../db";
const Recipe = db.Recipe;

import express, {
  NextFunction,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";
const router = express.Router();

/* get all recipes
localhost:3000/api/recipes */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipes = await Recipe.findAll();
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

/* get a single recipe
localhost:3000/api/recipes/:id */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    if (id) {
      const recipe = await Recipe.findByPk(id);
      res.send(recipe);
    }
  } catch (error) {
    return res.sendStatus(501).send(error);
  }
});

/* create a new recipe
localhost:3000/api/recipes */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, url, personal_note, calories } = req.body;
    const newRecipe = await Recipe.create({
      name,
      url,
      personal_note,
      calories,
    });
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(501).send(error);
  }
});

/* update a recipe
localhost:3000/api/recipes/:id */
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { name, url, personal_note, calories } = req.body;
    const recipe = await Recipe.findByPk(id);
    recipe?.update({
      name,
      url,
      personal_note,
      calories,
    });
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(501).send(error);
  }
});

/* delete a recipe
localhost:3000/api/recipes/:id */

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NOTFOUNDMESSAGE = `The recipe you are trying to delete does not exist!!`;
      const id = req.params.id;
      const recipeToDelete = await Recipe.findByPk(id);
      if (!recipeToDelete) {
        throw new Error(NOTFOUNDMESSAGE);
      }
      await recipeToDelete.destroy();
      res.send(202);
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  }
);
export default router;
