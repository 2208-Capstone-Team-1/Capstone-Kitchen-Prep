import db from "./db";
import { UUID, UUIDV4, STRING, ENUM, Sequelize } from "sequelize";
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
  userOrAlexa: string;
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
  userOrAlexa: {
    type: STRING,
    allowNull: false,
  },
});

export default Chatlog;
