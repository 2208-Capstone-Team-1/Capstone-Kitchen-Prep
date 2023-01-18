import Recipe from "../Recipe";
import { UserModel } from "../User";

const recipeSeed = async (users: any) => {
  console.log("SEEDING RECIPES");

  //creating recipes for the database to be seeded with

  const [
    butterChicken,
    mushroomRisotto,
    shrimpScampi,
    chickenParm,
    vegEnchiladas,
    spagSquash,
    chickenFajitas,
    chipotleBowl,
    chickenTinga,
    tofuStirFry,
  ] = await Promise.all([
    Recipe.create({
      name: "Instant Pot Butter Chicken",
      url: "https://www.delish.com/cooking/recipe-ideas/a29859055/instant-pot-butter-chicken-recipe/",
      personal_note:
        "This was really good, will definitely make again. Maybe a little less sauce next time.",
      calories: 600,
    }),
    Recipe.create({
      name: "Instant Pot Mushroom Risotto",
      url: "https://damndelicious.net/2018/03/21/instant-pot-mushroom-risotto/",
      personal_note: "Quick, delicious recipe for busy days!",
      calories: 725,
    }),
    Recipe.create({
      name: "Shrimp Scampi with Broccoli",
      url: "https://www.skinnytaste.com/shrimp-scampi-with-broccoli-orzo/",
      personal_note: "Cook the broccoli longer to make it softer",
      calories: 420,
    }),
    Recipe.create({
      name: "Chicken Parm Lasagna",
      url: "https://www.skinnytaste.com/chicken-parmesan-lasagna/",
      personal_note: "Double the recipe for a good group dinner",
      calories: 810,
    }),
    Recipe.create({
      name: "Vegetarian Enchiladas",
      url: "https://www.skinnytaste.com/butternut-squash-and-black-bean/",
      personal_note: "For all the vegetarians out there!",
      calories: 575,
    }),
    Recipe.create({
      name: "Spaghetti Squash Parmesan Mushrooms",
      url: "https://www.wellplated.com/roasted-spaghetti-squash-parmesan-mushrooms/",
      personal_note: "Mmm spaghetti squash",
      calories: 678,
    }),
    Recipe.create({
      name: "Crock Pot Chicken Fajitas",
      url: "https://www.cookingclassy.com/slow-cooker-chicken-fajitas/",
      personal_note: "This is for meal prepping over the weekend",
      calories: 634,
    }),
    Recipe.create({
      name: "Chipotle Sweet Potato Bowls",
      url: "https://pinchofyum.com/chipotle-tahini-bowls",
      personal_note: "Quick, easy meal!",
      calories: 514,
    }),
    Recipe.create({
      name: "Chicken Tinga Bowls",
      url: "https://pinchofyum.com/30-minute-meal-prep-sheet-pan-chicken-tinga-bowls",
      personal_note: "Add some red pepper flakes to add some kick!",
      calories: 605,
    }),
    Recipe.create({
      name: "Tofu Stir Fry Noodles",
      url: "https://pinchofyum.com/back-pocket-stir-fry",
      personal_note: "Make in the wok, it's much easier",
      calories: 823,
    }),
  ]);

  // Destruct users out of users object
  const { moe, lucy, larry, ethyl, admin } = users;

  // Create associations using magic methods
  await moe.addRecipe(butterChicken);
  await moe.addRecipe(mushroomRisotto);
  await lucy.addRecipe(shrimpScampi);
  await lucy.addRecipe(chickenParm);
  await lucy.addRecipe(vegEnchiladas);
  await lucy.addRecipe(spagSquash);
  await larry.addRecipe(chickenFajitas);
  await ethyl.addRecipe(chipotleBowl);
  await admin.addRecipe(chickenTinga);
  await admin.addRecipe(tofuStirFry);
  console.log("DONE SEEDING RECIPES");
};

export default recipeSeed;
