import db from "./db";
import { UUID, INTEGER, UUIDV4, STRING } from "sequelize";
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
  id: CreationOptional<string>;
  ingredient: string;
  quantity: number;
  imageUrl: string;
}

const Ingredient = db.define<IngredientModel>("ingredient", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
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
    defaultValue: 0,
    allowNull: true,
  },
  imageUrl: {
    type: STRING,
    defaultValue: "./static/ingredients/defaultIngredientImage.jpg",
    allowNull: true,
  },
});

export default Ingredient;
