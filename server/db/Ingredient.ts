import db from "./db"
import { NUMBER, Sequelize, STRING } from "sequelize"
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
     >{
         id: CreationOptional<number>;
         ingredient: string;
         quantity: number;
     }

const Ingredient = db.define<IngredientModel>("ingredient", {
    id: {
        type: NUMBER,
        allowNull: false,
    },
    ingredient: {
        type: STRING,
        defaultValue: "Food Item",
        allowNull: true,
    },
    quantity: {
        type: NUMBER,
        defaultValue: 0,
        allowNull: true,
    }
})

export default Ingredient;