import db from "./db";
import User from "./User";

const seed = async () => {
  await db.sync({ force: true });

  const [moe, lucy, larry, ethyl, admin] = await Promise.all([
    User.create({ first_name: "moe", last_name: "johns", password: "123", email: "moe@gmail.com", phoneNumber:"2013456789", isAdmin: false }),
    User.create({ first_name: "lucy", last_name: "lee", password: "123", email: "lucy@gmail.com", phoneNumber:"2015429874", isAdmin: false  }),
    User.create({ first_name: "larry", last_name: "whiton", password: "123", email: "larry@gmail.com", phoneNumber:"2013621785", isAdmin: false  }),
    User.create({ first_name: "ethyl", last_name: "larus", password: "123", email: "ethyl@gmail.com", phoneNumber:"2019685472", isAdmin: false  }),
    User.create({ first_name: "admin", last_name: "admin", password: "123", email: "admin@gmail.com", phoneNumber:"2019685472", isAdmin: true }),
  ]);

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
