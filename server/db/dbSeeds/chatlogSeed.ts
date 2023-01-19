import Chatlog from "../Chatlog";

const chatlogSeed = async (users: any) => {
  console.log("SEEDING CHATLOG");

  //creating recipes for the database to be seeded with

  const [
    chat1Moe,
    chat2Moe,
    chat3Moe,
    chat4Moe,
    chat5Moe,
    chat6Moe,
    chat1Lucy,
    chat2Lucy,
    chat3Lucy,
    chat4Lucy,
  ] = await Promise.all([
    Chatlog.create({
      log: "Hello Alexa",
      userOrAlexa: "User",
    }),
    Chatlog.create({
      log: "Hello Moe",
      userOrAlexa: "Alexa",
    }),
    Chatlog.create({
      log: "I'd like to make something delicious tonight, launch Chef's Kiss",
      userOrAlexa: "User",
    }),
    Chatlog.create({
      log: "Ok, launching Chef's Kiss",
      userOrAlexa: "Alexa",
    }),
    Chatlog.create({
      log: "Please add the following to my pantry: chicken breast, orzo, cucumber, shrimp, salmon. What can I make with these ingredients?",
      userOrAlexa: "User",
    }),
    Chatlog.create({
      log: "You can make this chicken orzo recipe I found",
      userOrAlexa: "Alexa",
    }),
    Chatlog.create({
      log: "Hello Alexa",
      userOrAlexa: "User",
    }),
    Chatlog.create({
      log: "Hello Lucy",
      userOrAlexa: "Alexa",
    }),
    Chatlog.create({
      log: "What can I make with the ingredients in my pantry tonight?",
      userOrAlexa: "User",
    }),
    Chatlog.create({
      log: "You can make this sweet potato caserole I found",
      userOrAlexa: "Alexa",
    }),
  ]);

  // Destruct users out of users object
  const { moe, lucy } = users;

  // Create associations using magic methods
  await moe.addChatlog(chat1Moe);
  await moe.addChatlog(chat2Moe);
  await moe.addChatlog(chat3Moe);
  await moe.addChatlog(chat4Moe);
  await moe.addChatlog(chat5Moe);
  await moe.addChatlog(chat6Moe);
  await lucy.addChatlog(chat1Lucy);
  await lucy.addChatlog(chat2Lucy);
  await lucy.addChatlog(chat3Lucy);
  await lucy.addChatlog(chat4Lucy);

  console.log("DONE SEEDING CHATLOG");
};

export default chatlogSeed;
