import db from "./db";
import User from "./User";
import seed from "./seed";
import Recipe from "./Recipe";
import Chatlog from "./Chatlog";
import Ingredient from "./Ingredient";

const data = {
  User,
  seed,
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
Recipe.hasMany(Chatlog);
Chatlog.belongsTo(Recipe);

// Ingredients & Others
User.hasMany(Ingredient);
Ingredient.belongsTo(User);
Recipe.hasMany(Ingredient);
Ingredient.hasMany(Recipe);

export default data;
