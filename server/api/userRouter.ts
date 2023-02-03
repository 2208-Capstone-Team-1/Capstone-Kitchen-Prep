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
    return res.sendStatus(501).send(error);
  }
});

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

/* update a new user
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
    return res.sendStatus(501).send(error);
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
      res.send(202);
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  }
);

export default router;
