import db from "./db";
import Sequelize from "sequelize";

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
    >{
        id: CreationOptional<number>;
        name: string;
        url: string;
        personal_note: CreationOptional<string>;
        calories: string;
    }

const Recipe = db.define<RecipeModel>("recipe", {
    id: {
        type: UUID,
        primaryKey: true,
    },
    name: {
        type: STRING,
        allowNull: false
    },
    url:{
        type: STRING,
        allowNull: false
    },
    personal_note: {
        type: STRING,
        defaultValue: "personal note for recipe",
        allowNull: true,
    },
    calories:{
        type: STRING,
        defaultValue: "if it was tasty, it's 0 cal!",
        allowNull: false,
    }
})

export default Recipe;