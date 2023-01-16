import db from "./db";
import { INTEGER, UUID, NUMBER, Sequelize, STRING } from "sequelize";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface ChatlogModel
  extends Model<
    InferAttributes<ChatlogModel>,
    InferCreationAttributes<ChatlogModel>
  > {
  id: number;
  log: string;
}

const Chatlog = db.define<ChatlogModel>("chatlog", {
  id: {
    // type: NUMBER,
    // type: UUID,
    type: INTEGER,

    allowNull: false,
    primaryKey: true,
  },
  log: {
    type: STRING,
    allowNull: false,
  },
});

export default Chatlog;
