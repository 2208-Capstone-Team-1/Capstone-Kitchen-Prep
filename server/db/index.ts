import db from "./db";
import User from "./User";
import Recipe from "./Recipe";
import Chatlog from "./Chatlog";
import Ingredient from "./Ingredient";
import dotenv from "dotenv";
dotenv.config();

const data = {
  User,
  db,
  Recipe,
  Chatlog,
  Ingredient,
};

// User & Recipe
User.hasMany(Recipe);
Recipe.belongsTo(User);

// User & Chatlog
User.hasMany(Chatlog);
Chatlog.belongsTo(User);

// Recipe & Chatlog
// Ed - leaving these associations in for now but might not be needed
Recipe.hasMany(Chatlog);
Chatlog.belongsTo(Recipe);

// Ingredients & User
User.hasMany(Ingredient);
Ingredient.belongsTo(User);

// Ed - removing these associations for now as might not be needed
// Recipe.hasMany(Ingredient);
// Ingredient.hasMany(Recipe);

export default data;
