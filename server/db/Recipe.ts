import db from "./db";
import Sequelize, { INTEGER } from "sequelize";

import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface ResponseError extends Error {
  status?: number;
}
const { STRING, UUID, UUIDV4 } = Sequelize;

interface RecipeModel
  extends Model<
    InferAttributes<RecipeModel>,
    InferCreationAttributes<RecipeModel>
  > {
  id: CreationOptional<string>;
  name: string;
  url: string;
  personal_note: CreationOptional<string>;
  calories: number;
}

const Recipe = db.define<RecipeModel>("recipe", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  url: {
    type: STRING,
    allowNull: false,
  },
  personal_note: {
    type: STRING,
    defaultValue: "personal note for recipe",
    allowNull: true,
  },
  calories: {
    type: INTEGER,
    defaultValue: "if it was tasty, it's 0 cal!",
    allowNull: false,
  },
});

export default Recipe;
