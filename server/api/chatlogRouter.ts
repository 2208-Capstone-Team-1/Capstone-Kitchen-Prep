import db from "../db";
const Chatlog = db.Chatlog;

import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

/* get all chatlogs
localhost:3000/api/chatlogs */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chatlogs = await Chatlog.findAll();
    res.send(chatlogs);
  } catch (error) {
    next(error);
  }
});

/* get a chatlog
localhost:3000/api/chatlogs/:id */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (id) {
      const chatlog = await Chatlog.findByPk(id);
      res.send(chatlog);
    }
  } catch (error) {
    return res.sendStatus(501).send(error);
  }
});

/* create a chatlog
localhost:3000/api/chatlogs */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { log, userOrAlexa } = req.body;
    const chatlog = await Chatlog.create({ log, userOrAlexa });
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(501).send(error);
  }
});

/* update a chatlog
localhost:3000/api/chatlogs/:id */
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const { log, userOrAlexa } = req.body;
    const chatlog = await Chatlog.findByPk(id);
    await chatlog?.update({ log, userOrAlexa });
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(501).send(error);
  }
});

/* delete a chatlog
localhost:3000/api/chatlogs/:id */
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const NOTFOUNDMESSAGE = `The chatlog you are trying to delete does not exist!!`;
      const id = req.params.id;
      const chatlogToDelete = await Chatlog.findByPk(id);
      if (!chatlogToDelete) {
        throw new Error(NOTFOUNDMESSAGE);
      }
      await chatlogToDelete.destroy();
      res.send(202);
    } catch (error) {
      return res.sendStatus(404).send(error);
    }
  }
);
export default router;
