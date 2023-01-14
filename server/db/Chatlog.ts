import db from "./db";
import { NUMBER, Sequelize, STRING } from "sequelize";
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
    >{
        id: CreationOptional<number>;
        log: string;
    }

const Chatlog = db.define<ChatlogModel>("chatlog", {
    id: {
        type: NUMBER,
        allowNull: false,
    },
    log: {
        type: STRING,
        allowNull: false,
    }
})

export default Chatlog;