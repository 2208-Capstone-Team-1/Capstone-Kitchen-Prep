import Ingredient from "../Ingredient";

const ingredientSeed = async (users: any) => {
  console.log("SEEDING INGREDIENT");

  //creating recipes for the database to be seeded with

  const [
    chickenBreast,
    cucumber,
    shrimp,
    salmon,
    potato,
    asparagus,
    couscous,
    sweetPotato,
    brusselSprout,
    spaghetti,
  ] = await Promise.all([
    Ingredient.create({
      ingredient: "Chicken Breast",
      quantity: 2,
    }),
    Ingredient.create({
      ingredient: "Cucumber",
      quantity: 4,
    }),
    Ingredient.create({
      ingredient: "Shrimp",
      quantity: 10,
    }),
    Ingredient.create({
      ingredient: "Salmon",
      quantity: 4,
    }),
    Ingredient.create({
      ingredient: "Potato",
      quantity: 4,
    }),
    Ingredient.create({
      ingredient: "Asparagus",
      quantity: 3,
    }),
    Ingredient.create({
      ingredient: "Couscous",
      quantity: 1,
    }),
    Ingredient.create({
      ingredient: "Sweet Potato",
      quantity: 3,
    }),
    Ingredient.create({
      ingredient: "Brussel Sprout",
      quantity: 10,
    }),
    Ingredient.create({
      ingredient: "Spaghetti",
      quantity: 2,
    }),
  ]);

  // Destruct users out of users object
  const { moe, lucy } = users;

  // Create associations using magic methods
  await moe.addIngredient(chickenBreast);
  await moe.addIngredient(cucumber);
  await moe.addIngredient(shrimp);
  await moe.addIngredient(salmon);
  await lucy.addIngredient(potato);
  await lucy.addIngredient(asparagus);
  await lucy.addIngredient(couscous);
  await lucy.addIngredient(sweetPotato);
  await lucy.addIngredient(brusselSprout);
  await lucy.addIngredient(spaghetti);
  console.log("DONE SEEDING INGREDIENTS");
};

export default ingredientSeed;
