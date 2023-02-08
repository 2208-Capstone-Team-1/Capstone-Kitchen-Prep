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
      name: "Chicken Breast",
      quantity: 2,
      image: "./static/ingredients/chickenBreast.jpg",
    }),
    Ingredient.create({
      name: "Cucumber",
      quantity: 4,
      image: "./static/ingredients/cucumber.jpg",
    }),
    Ingredient.create({
      name: "Shrimp",
      quantity: 10,
      image: "./static/ingredients/shrimp.jpg",
    }),
    Ingredient.create({
      name: "Salmon",
      quantity: 4,
      image: "./static/ingredients/salmon.jpg",
    }),
    Ingredient.create({
      name: "Potato",
      quantity: 4,
      image: "./static/ingredients/potato.jpg",
    }),
    Ingredient.create({
      name: "Asparagus",
      quantity: 3,
      image: "./static/ingredients/asparagus.jpg",
    }),
    Ingredient.create({
      name: "Couscous",
      quantity: 1,
      image: "./static/ingredients/couscous.jpg",
    }),
    Ingredient.create({
      name: "Sweet Potato",
      quantity: 3,
      image: "./static/ingredients/sweetPotato.jpg",
    }),
    Ingredient.create({
      name: "Brussel Sprout",
      quantity: 10,
      image: "./static/ingredients/brusselSprout.jpg",
    }),
    Ingredient.create({
      name: "Spaghetti",
      quantity: 2,
      image: "./static/ingredients/spaghetti.jpg",
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
