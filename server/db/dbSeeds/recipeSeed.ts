import Recipe from "db/Recipe";
import db from "../db";

const recipeSeed = async () => {
  console.log("SEEDING RECIPES");

  const recipes = [
    {
      name: "Instant Pot Butter Chicken",
      url: "https://www.delish.com/cooking/recipe-ideas/a29859055/instant-pot-butter-chicken-recipe/",
      personal_note:
        "This was really good, will definitely make again. Maybe a little less sauce next time.",
      calories: 600,
    },
    {
      name: "Instant Pot Mushroom Risotto",
      url: "https://damndelicious.net/2018/03/21/instant-pot-mushroom-risotto/",
      personal_note: "Quick, delicious recipe for busy days!",
      calories: 725,
    },
    {
      name: "Shrimp Scampi with Broccoli",
      url: "https://www.skinnytaste.com/shrimp-scampi-with-broccoli-orzo/",
      personal_note: "Cook the broccoli longer to make it softer",
      calories: 420,
    },
    {
      name: "Chicken Parm Lasagna",
      url: "https://www.skinnytaste.com/chicken-parmesan-lasagna/",
      personal_note: "Double the recipe for a good group dinner",
      calories: 810,
    },
    {
      name: "Vegetarian Enchiladas",
      url: "https://www.skinnytaste.com/butternut-squash-and-black-bean/",
      personal_note: "For all the vegetarians out there!",
      calories: 575,
    },
    {
      name: "Spaghetti Squash Parmesan Mushrooms",
      url: "https://www.wellplated.com/roasted-spaghetti-squash-parmesan-mushrooms/",
      personal_note: "Mmm spaghetti squash",
      calories: 678,
    },
    {
      name: "Crock Pot Chicken Fajitas",
      url: "https://www.cookingclassy.com/slow-cooker-chicken-fajitas/",
      personal_note: "This is for meal prepping over the weekend",
      calories: 634,
    },
    {
      name: "Chipotle Sweet Potato Bowls",
      url: "https://pinchofyum.com/chipotle-tahini-bowls",
      personal_note: "Quick, easy meal!",
      calories: 514,
    },
    {
      name: "Chicken Tinga Bowls",
      url: "https://pinchofyum.com/30-minute-meal-prep-sheet-pan-chicken-tinga-bowls",
      personal_note: "Add some red pepper flakes to add some kick!",
      calories: 605,
    },
    {
      name: "Tofu Stir Fry Noodles",
      url: "https://pinchofyum.com/back-pocket-stir-fry",
      personal_note: "Make in the wok, it's much easier",
      calories: 823,
    },
  ];
  await Promise.all(recipes.map((recipe) => Recipe.create(recipe)));
};

module.exports = recipeSeed;
