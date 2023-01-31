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
      imageUrl: "./static/ingredients/chickenBreast.jpg",
    }),
    Ingredient.create({
      ingredient: "Cucumber",
      quantity: 4,
      imageUrl: "./static/ingredients/cucumber.jpg",
    }),
    Ingredient.create({
      ingredient: "Shrimp",
      quantity: 10,
      imageUrl: "./static/ingredients/shrimp.jpg",
    }),
    Ingredient.create({
      ingredient: "Salmon",
      quantity: 4,
      imageUrl: "./static/ingredients/salmon.jpg",
    }),
    Ingredient.create({
      ingredient: "Potato",
      quantity: 4,
      imageUrl: "./static/ingredients/potato.jpg",
    }),
    Ingredient.create({
      ingredient: "Asparagus",
      quantity: 3,
      imageUrl: "./static/ingredients/asparagus.jpg",
    }),
    Ingredient.create({
      ingredient: "Couscous",
      quantity: 1,
      imageUrl: "./static/ingredients/couscous.jpg",
    }),
    Ingredient.create({
      ingredient: "Sweet Potato",
      quantity: 3,
      imageUrl: "./static/ingredients/sweetPotato.jpg",
    }),
    Ingredient.create({
      ingredient: "Brussel Sprout",
      quantity: 10,
      imageUrl: "./static/ingredients/brusselSprout.jpg",
    }),
    Ingredient.create({
      ingredient: "Spaghetti",
      quantity: 2,
      imageUrl: "./static/ingredients/spaghetti.jpg",
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
