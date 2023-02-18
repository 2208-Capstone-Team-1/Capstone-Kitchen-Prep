import db from "./db";
import User from "./User";
import Recipe from "./Recipe";
import Ingredient from "./Ingredient";
import dotenv from "dotenv";
dotenv.config();

const data = {
  User,
  db,
  Recipe,
  Ingredient,
};

// User & Recipe
User.hasMany(Recipe);
Recipe.belongsTo(User);

// Ingredients & User
User.hasMany(Ingredient);
Ingredient.belongsTo(User);

export default data;
