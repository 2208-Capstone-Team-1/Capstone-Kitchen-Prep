import db from "./db";
import User from "./User";
import recipeSeed from "./dbSeeds/recipeSeed";
import ingredientSeed from "./dbSeeds/ingredientSeed";

const seed = async () => {
  console.log("BEGINNING SEEDING...");

  await db.sync({ force: true });

  // SEEDING USERS

  const [moe, lucy, larry, ethyl, admin] = await Promise.all([
    User.create({
      first_name: "moe",
      last_name: "johns",
      password: "123123",
      email: "moe@gmail.com",
      phoneNumber: "2013456789",
      isAdmin: false,
    }),
    User.create({
      first_name: "lucy",
      last_name: "lee",
      password: "123123",
      email: "lucy@gmail.com",
      phoneNumber: "2015429874",
      isAdmin: false,
    }),
    User.create({
      first_name: "larry",
      last_name: "whiton",
      password: "123123",
      email: "larry@gmail.com",
      phoneNumber: "2013621785",
      isAdmin: false,
    }),
    User.create({
      first_name: "ethyl",
      last_name: "larus",
      password: "123123",
      email: "ethyl@gmail.com",
      phoneNumber: "2019685472",
      isAdmin: false,
    }),
    User.create({
      first_name: "admin",
      last_name: "admin",
      password: "123123",
      email: "admin@gmail.com",
      phoneNumber: "2019685472",
      isAdmin: true,
    }),
  ]);

  const users = { moe, lucy, larry, ethyl, admin };

  await recipeSeed(users);
  await ingredientSeed(users);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
      admin,
    },
  };
};

export default seed;
