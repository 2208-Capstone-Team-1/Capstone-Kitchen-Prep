import db from "./db";
import { UUID, INTEGER, UUIDV4, STRING } from "sequelize";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface IngredientModel
  extends Model<
    InferAttributes<IngredientModel>,
    InferCreationAttributes<IngredientModel>
  > {
  id: CreationOptional<string>;
  name: string;
  quantity: number;
  image: string;
}

const Ingredient = db.define<IngredientModel>("ingredient", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
    defaultValue: "Food Item",
    allowNull: true,
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  image: {
    type: STRING,
    defaultValue: "./static/ingredients/defaultIngredientImage.jpg",
    allowNull: true,
  },
});

export default Ingredient;
