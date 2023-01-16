import db from "./db";
import { UUID, UUIDV4, STRING } from "sequelize";
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
  id: CreationOptional<string>;
  log: string;
}

const Chatlog = db.define<ChatlogModel>("chatlog", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  log: {
    type: STRING,
    allowNull: false,
  },
});

export default Chatlog;
