import db from "./db";
import { UUID, INTEGER, NUMBER, Sequelize, STRING } from "sequelize";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface ResponseError extends Error {
  status?: number;
}

interface IngredientModel
  extends Model<
    InferAttributes<IngredientModel>,
    InferCreationAttributes<IngredientModel>
  > {
  id: CreationOptional<number>;
  ingredient: string;
  quantity: number;
}

const Ingredient = db.define<IngredientModel>("ingredient", {
  id: {
    // type: NUMBER,
    // type: UUID,
    type: INTEGER,

    allowNull: false,
    primaryKey: true,
  },
  ingredient: {
    type: STRING,
    defaultValue: "Food Item",
    allowNull: true,
  },
  quantity: {
    type: INTEGER,
    // type: UUID,
    defaultValue: 0,
    allowNull: true,
  },
});

export default Ingredient;
