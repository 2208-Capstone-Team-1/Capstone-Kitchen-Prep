``` js
/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const axios = require('axios');
const firebase = require('firebase/compat/app');
require('firebase/compat/database');

firebase.initializeApp({
  apiKey: "AIzaSyACYBhS0y2OHMoflq0g0TRdQiiArnfrrYE",
  authDomain: "chefs-kiss-d30f4.firebaseapp.com",
  projectId: "chefs-kiss-d30f4",
  storageBucket: "chefs-kiss-d30f4.appspot.com",
  messagingSenderId: "376445935624",
  appId: "1:376445935624:web:1cd185df98d8d51beaf1bd",
  measurementId: "G-3T0TQJQNJH",
});

const database = firebase.database();


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    
    handle(handlerInput) {
        
        let speakOutput = `Welcome to Chef's Kiss. Let's get cooking. Tell me what you have in your fridge to start cooking <break time='0.5s'/>`;
        speakOutput += " or say 'help' to hear what you can say"

        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();

    }
};

const IngredientsIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'IngredientsIntent'
            )
    },
    
    async handle(handlerInput){
      // grabbing api & axios from ingredientLogic.js file
      const idFetchLogic = require("./idFetcherLogic");
      let gettingId = await idFetchLogic.fetchID();
      let id = await gettingId; //getting id from users db

      const phoneFetcherLogic = require("./phoneFetcherLogic");
      let fetchNumber = await phoneFetcherLogic.fetchNumber();
      let phoneNumber = await fetchNumber; //getting phone number from users db

      const addingIngredient = require("./addingIngredient");
      
      //get the current session attributes, creating an object you can read and update
      
      const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
      // checks if we have an array called fridge. If not, create one
      if (!sessionAttributes.hasOwnProperty("fridge"))
      sessionAttributes.fridge = [];
      
      // takes in VUI & define as a slot ( ingredient )
      let ingredient =
      handlerInput.requestEnvelope.request.intent.slots.ingredient.value;
      let fridge = sessionAttributes.fridge;
      
    // ISSUES WITH POSTING TO DEPLOYED WEBSITES API   
    //   let addIngredient = await addingIngredient.addIngredient(id, ingredient);
    //   let addedIngredient = await addIngredient;
      
      // get fridgeFiller function
      const fFunction = require("./fridge");

      // speakoutput will be left empty
      let speakOutput = "";

      // if the user's fridge is empty - assuming this is the user's first time using chef's kiss -, Alexa will give more detailed instruction
      if (fridge.length < 1) {
        speakOutput = `I have added ${ingredient} to your fridge. You can say 'fridge' to check your ingredients anytime.`;
        fridge.push(ingredient);
        // pushing ingredient into the fridge storage inside firdge.js
        fFunction.fridgeFiller(ingredient);
      } else {
        // if the user's fridge is not empty - meaning this is not their first time using the skill - it will simply add item to the fridge
        speakOutput = `I have added ${ingredient} to your fridge.`;
        // pushing ingredient into the fridge storage inside firdge.js
        fFunction.fridgeFiller(ingredient);
      }

      // const test = Alexa.getSlotValue(handlerInput.requestEnvelope, 'ingredient')
      // const hello = "hello my name is hungry. Nice to meet you, hey.";

      try {
        firebase.database().goOnline();
        function pad2(n) {
            return n < 10 ? "0" + n : n;
        }
        let current = new Date();
        let fulldate =
            current.getFullYear().toString() +
            pad2(current.getMonth() + 1) +
            pad2(current.getDate()) +
            pad2(current.getHours()) +
            pad2(current.getMinutes()) +
            pad2(current.getSeconds());
        let date = current.toLocaleDateString().split("/").join("_");
        let time = current.toLocaleTimeString();
        await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
          // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
          VALUE: speakOutput, // what alexa is saying
          TIME: time,
          DATE: date,
          SPEAKER: ingredient, //what the user is saying
        });
        firebase.database().goOffline();
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
      } catch (error) {
        console.log("ERROR", error);
      }
    }
        
};

// this handler checks what user has in their Fridge

const FridgeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "FridgeIntent"
    );
  },


  async handle(handlerInput) {
    // grabbing api & axios from ingredientLogic.js file
    const idFetchLogic = require("./idFetcherLogic");
    let gettingId = await idFetchLogic.fetchID();
    let id = await gettingId; //getting id from users db
    const phoneFetcherLogic = require("./phoneFetcherLogic");
    let fetchNumber = await phoneFetcherLogic.fetchNumber();
    let phoneNumber = await fetchNumber; //getting phone number from users db
    const ingredientLogic = require("./ingredientLogic.js");
    let response = await ingredientLogic.fetchIngredientApi(id);
    let storage = await response; //getting specific user's data & associated models
    let speakOutput = "You have ";

    //below code pushed user's ingredient into alexa's state
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    if (!sessionAttributes.hasOwnProperty("IngredientFridge"))
      sessionAttributes.IngredientFridge = [];
    let IngredientFridge = sessionAttributes.IngredientFridge;
    // now all ingredients are 'stored' in IngredientFridge for future use
    IngredientFridge.push(storage.ingredients);

    let fridge = storage.ingredients;

    //if user's fridge is empty, user will get a different response
    if (fridge.length === 0) {
      speakOutput =
        "Hmm. There's no items in your fridge. To add items say 'Add' then the name of the item you wish to add ";
    } else {
      //if user's fridge is NOT empty, loop through it and list items in the fridge
      for (let i = 0; i < fridge.length; i++) {
        let item = fridge[i];
        speakOutput += item.name + ", " + "<break time='0.3s'/>";
      }
      speakOutput += "in your fridge. <break time='0.3s'/>";
      speakOutput +=
        "To add more items, say 'Add' then the name of the item you wish to add. <break time='0.3s'/>";
      speakOutput +=
        "I can suggest you a recipe based on your ingredients. Say 'find recipe' to hear what you can cook";
    }

    let vui = handlerInput.requestEnvelope.request.intent.slots.fridge.value;

    try {
      firebase.database().goOnline();
      function pad2(n) {
        return n < 10 ? "0" + n : n;
      }
      let current = new Date();
      let fulldate =
        current.getFullYear().toString() +
        pad2(current.getMonth() + 1) +
        pad2(current.getDate()) +
        pad2(current.getHours()) +
        pad2(current.getMinutes()) +
        pad2(current.getSeconds());
      let date = current.toLocaleDateString().split("/").join("_");
      let time = current.toLocaleTimeString();
      await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
        // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
        VALUE: speakOutput.split("<break time='0.3s'/>").join(" "), // what alexa is saying
        TIME: time,
        DATE: date,
        SPEAKER: vui, //what the user is saying
      });
      firebase.database().goOffline();

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    } catch (error) {
      console.log("ERROR", error);
    }
  },
};


const SavedRecipeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "SavedRecipeIntent"
    );
  },


  async handle(handlerInput) {
    // grabbing api & axios from logic files
    const idFetchLogic = require("./idFetcherLogic");
    let gettingId = await idFetchLogic.fetchID();
    let id = await gettingId; //getting id from users db
    const phoneFetcherLogic = require("./phoneFetcherLogic");
    let fetchNumber = await phoneFetcherLogic.fetchNumber();
    let phoneNumber = await fetchNumber; //getting phone number from users db
    const ingredientLogic = require("./ingredientLogic.js");
    let response = await ingredientLogic.fetchIngredientApi(id);
    let storage = await response; //getting specific user's data & associated models
    let speakOutput = "Sure. Here's your saved recipes. <break time='0.3s'/>";

    let savedRecipe = storage.recipes;

    if (savedRecipe.length === 0) {
      speakOutput +=
        "Hmm. Looks like there's nothing saved here. If you want to hear what you can make with your ingredients, say 'recipe'";
    } else {
      speakOutput += "I found following recipes. <break time='0.3s'/>";
      for (let i = 0; i < savedRecipe.length; i++) {
        let recipe = savedRecipe[i].name;
        speakOutput += recipe + ", " + "<break time='0.3s'/>";
      }
      speakOutput += ". Which recipe would you like to make today?";
    }

    let vui =
      handlerInput.requestEnvelope.request.intent.slots.savedRecipes.value;

    try {
      firebase.database().goOnline();
      function pad2(n) {
        return n < 10 ? "0" + n : n;
      }
      let current = new Date();
      let fulldate =
        current.getFullYear().toString() +
        pad2(current.getMonth() + 1) +
        pad2(current.getDate()) +
        pad2(current.getHours()) +
        pad2(current.getMinutes()) +
        pad2(current.getSeconds());
      let date = current.toLocaleDateString().split("/").join("_");
      let time = current.toLocaleTimeString();
      await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
        // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
        VALUE: speakOutput.split("<break time='0.3s'/>").join(" "), // what alexa is saying
        TIME: time,
        DATE: date,
        SPEAKER: vui, //what the user is saying
      });
      firebase.database().goOffline();

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    } catch (error) {
      console.log("ERROR IN SAVED RECIPES", error);
    }
  },
};

// this handler takes in VUI (saved recipe's name in this case)
// then using filter, pulls the recipe's url
// then insert the url into spoonacular's api to grab needed ingredients and cooking steps
const RecipeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "RecipeIntent"
    );
  },

  async handle(handlerInput) {
    // grabbing api & axios from logic files
    const idFetchLogic = require("./idFetcherLogic");
    let gettingId = await idFetchLogic.fetchID();
    let id = await gettingId; //getting id from users db
    const phoneFetcherLogic = require("./phoneFetcherLogic");
    let fetchNumber = await phoneFetcherLogic.fetchNumber();
    let phoneNumber = await fetchNumber; //getting phone number from users db
    const ingredientLogic = require("./ingredientLogic.js");
    let response = await ingredientLogic.fetchIngredientApi(id);
    let storage = await response; //getting specific user's data & associated models
    // let speakOutput = "Ok. Let's get started. <break time='0.5s'/>";

    let speakOutput =
      "Ok. I sent the needed ingredients to your chat. Say 'start cooking' when you are ready";

    // grabbing user's saved recipe array
    let recipes = storage.recipes; //array of recipe objects
    let vuiRecipe =
      handlerInput.requestEnvelope.request.intent.slots.recipe.value; // what the user is saying to alexa

    // loops through recipes array to filter the object with matching recipe name
    let filteredRecipe = recipes.filter(
      (recipe) => recipe.name.toLowerCase() === vuiRecipe
    );
    let recipeUrl = filteredRecipe[0].url;
    let Edapi = "c36813915ba84ea2ab9c62461dc4d8b6"; // thanks Ed!
    let url = `https://api.spoonacular.com/recipes/extract?url=${recipeUrl}&apiKey=${Edapi}`;

    const recipeLogic = require("./recipeLogic");
    let gettingRecipe = await recipeLogic.recipeFetcher(url);
    const recipe = await gettingRecipe;

    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    // the recipe object will be pushed into recipeStorage
    // while the session is still on-going, this data will persist
    if (!sessionAttributes.hasOwnProperty("recipeStorage")) {
      sessionAttributes.recipeStorage = [];
    } else {
      let empty = [];
      sessionAttributes.recipeStorage = empty;
    }

    let tester = sessionAttributes.recipeStorage;
    tester.push(recipe);
    
    let ingredietNeeded = "";
    let recipeArr = recipe.extendedIngredients;
    
    for( let i=0; i<recipeArr.length; i++){
      let ingredient = recipeArr[i];
      ingredietNeeded += `${i + 1}. ${ingredient.original}`;
      ingredietNeeded += '\n';

    }

    try {
      firebase.database().goOnline();
      function pad2(n) {
        return n < 10 ? "0" + n : n;
      }
      let current = new Date();
      let fulldate =
        current.getFullYear().toString() +
        pad2(current.getMonth() + 1) +
        pad2(current.getDate()) +
        pad2(current.getHours()) +
        pad2(current.getMinutes()) +
        pad2(current.getSeconds());
      let date = current.toLocaleDateString().split("/").join("_");
      let time = current.toLocaleTimeString();
      await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
        // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
        VALUE: ingredietNeeded, // what alexa is saying
        TIME: time,
        DATE: date,
        SPEAKER: vuiRecipe, //what the user is saying
      });
      firebase.database().goOffline();

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    } catch (error) {
      console.log("ERROR IN RECIPE INTENT HANDLER", error);
    }
  },
};


const FindRecipeIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "FindRecipeIntent"
    );
  },

  async handle(handlerInput) {
    const idFetchLogic = require("./idFetcherLogic");
    let gettingId = await idFetchLogic.fetchID();
    let Userid = await gettingId; //getting id from users db
    const phoneFetcherLogic = require("./phoneFetcherLogic");
    let fetchNumber = await phoneFetcherLogic.fetchNumber();
    let phoneNumber = await fetchNumber; //getting phone number from users db

    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();

    let fridge = sessionAttributes.IngredientFridge[0];

    if (!sessionAttributes.hasOwnProperty("recipeStorage"))
      sessionAttributes.recipeStorage = [];
    let tester = sessionAttributes.recipeStorage;

    let Edapi = "c36813915ba84ea2ab9c62461dc4d8b6";

    let speakOutput = "Ok <break time='0.3s'/>";

    // look into user's IngredientFridge state to see what the user have in their fridge
    // if the state is empty, guide the user to say 'fridge' to fill the state
    if (!fridge) {
      speakOutput += "Let's check your fridge first. Say 'fridge' to head over";
    }

    // first extract ingredients
    // use those ingredients to look for recipe & extract id
    let url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${fridge[0].name}&number=1&apiKey=${Edapi}`;
    let response = await axios.get(url);
    let recipeData = response.data[0];
    let id = recipeData.id;
    let title = recipeData.title;
    // use THAT id to look for recipe's data & push it into recipeStorage

    let recipeUrl = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${Edapi}`;
    let res = await axios.get(recipeUrl);
    let data = res.data;
    let recipeArr = data.extendedIngredients;
    tester.push(data);
    // guide the user to say 'start cooking'
    speakOutput += `I found ${title} based on ingredients you have in your fridge. `;
    speakOutput += "All ingredients needed are sent to your chat. Say 'start cooking' when you are ready to cook";

    let ingredietNeeded = "";


    for( let i=0; i<recipeArr.length; i++){
      let ingredient = recipeArr[i];
      ingredietNeeded += `${i + 1}. ${ingredient.original}`;
      ingredietNeeded += '\n';

    }

    let vui =
      handlerInput.requestEnvelope.request.intent.slots.findRecipe.value;

    try {
      firebase.database().goOnline();
      function pad2(n) {
        return n < 10 ? "0" + n : n;
      }
      let current = new Date();
      let fulldate =
        current.getFullYear().toString() +
        pad2(current.getMonth() + 1) +
        pad2(current.getDate()) +
        pad2(current.getHours()) +
        pad2(current.getMinutes()) +
        pad2(current.getSeconds());
      let date = current.toLocaleDateString().split("/").join("_");
      let time = current.toLocaleTimeString();
      await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
        // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
        VALUE: ingredietNeeded,
        TIME: time,
        DATE: date,
        SPEAKER: vui, //what the user is saying
      });
      firebase.database().goOffline();
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    } catch (error) {
      console.log("ERROR IN FIND RECIPE INTENT HANDLER", error);
    }
  },
};

//cooking intent handler
const StartCookingIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "StartCookingIntent"
    );
  },

  async handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let recipeArr = sessionAttributes.recipeStorage;
    let instruction = recipeArr[0].analyzedInstructions[0].steps;

    const phoneFetcherLogic = require("./phoneFetcherLogic");
    let fetchNumber = await phoneFetcherLogic.fetchNumber();
    let phoneNumber = await fetchNumber; //getting phone number from users db
    
    let speakOutput = "";
    // this grabs the very first step of the cooking instruction
    // shifted array will be pushed into alexa's own 'useState' of sessionAttributes
    let step = instruction.shift();
    if(!sessionAttributes.hasOwnProperty('recipeSteps'))
    sessionAttributes.recipeSteps = instruction; 
    speakOutput += step.step;
    speakOutput += "<break time='0.3s'/> Say 'next' when you are ready.";

    let vui = handlerInput.requestEnvelope.request.intent.slots.startCooking.value;
    
    try {
      firebase.database().goOnline();
      function pad2(n) {
        return n < 10 ? "0" + n : n;
      }
      let current = new Date();
      let fulldate =
        current.getFullYear().toString() +
        pad2(current.getMonth() + 1) +
        pad2(current.getDate()) +
        pad2(current.getHours()) +
        pad2(current.getMinutes()) +
        pad2(current.getSeconds());
      let date = current.toLocaleDateString().split("/").join("_");
      let time = current.toLocaleTimeString();
      await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
        // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
        VALUE: speakOutput.split("<break time='0.3s'/>").join(" "), // what alexa is saying
        TIME: time,
        DATE: date,
        SPEAKER: vui, //what the user is saying
      });
      firebase.database().goOffline();
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    } catch (error) {
      console.log('ERROR IN START COOKING INTENT HANDLER', error)
    }

  },
};

// when users says 'next' that VUI will trigger below handler
const NextIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "NextIntent"
    );
  },

  async handle(handlerInput) {
    const phoneFetcherLogic = require("./phoneFetcherLogic");
    let fetchNumber = await phoneFetcherLogic.fetchNumber();
    let phoneNumber = await fetchNumber; //getting phone number from users db

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    // calling for recipeSteps state inside Alexa's own sessionAttribute storage
    let recipeSteps = sessionAttributes.recipeSteps;

    let speakOutput = "";
    // if there's no step left, Alexa will congratulate you
    if(recipeSteps.length === 0){
      speakOutput += "Congratulation. You are now finished. I hope you enjoy your meal"
    }else{
    // if there's more steps to take, it will use shift() method to grab the next step
    // this way, user will not repeat the same instruction
      let step = recipeSteps.shift();
  
      speakOutput += step.step;
    // repeat until there's no steps left
      speakOutput += "<break time='0.3s'/> Say 'next' when you are ready.";
    }

    let vui = handlerInput.requestEnvelope.request.intent.slots.next.value;
    try {
      firebase.database().goOnline();
      function pad2(n) {
        return n < 10 ? "0" + n : n;
      }
      let current = new Date();
      let fulldate =
        current.getFullYear().toString() +
        pad2(current.getMonth() + 1) +
        pad2(current.getDate()) +
        pad2(current.getHours()) +
        pad2(current.getMinutes()) +
        pad2(current.getSeconds());
      let date = current.toLocaleDateString().split("/").join("_");
      let time = current.toLocaleTimeString();
      await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
        // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
        VALUE: speakOutput.split("<break time='0.3s'/>").join(" "), // what alexa is saying
        TIME: time,
        DATE: date,
        SPEAKER: vui, //what the user is saying
      });
      firebase.database().goOffline();
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();

    } catch (error) {
      console.log(`ERROR AT NEXT INTENT HANDLER`, error)
    }

  },
};

const MainIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "MainIntent"
    );
  },

  handle(handlerInput) {

    
    let speakOutput = "Returning to main menu";
    speakOutput += "<break time='0.3s'/> How can I help you? "

    

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

// when user asks for 'help', the following response will be given
// <break time='1s'/> <- this allows for a one second pause between sentences
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },

    async handle(handlerInput) {
      const phoneFetcherLogic = require("./phoneFetcherLogic");
      let fetchNumber = await phoneFetcherLogic.fetchNumber();
      let phoneNumber = await fetchNumber; //getting phone number from users db

      let speakOutput = "";
      speakOutput +=
        "Sure. Here's some things you can say. You can say 'Fridge' to check your items, <break time='1s'/>";
      speakOutput +=
        "You can say 'add items' to add more ingredients to your fridge. <break time='1s'/>' ";
      speakOutput +=
        "You can also say 'saved recipe' to check your saved recipes. <break time='1s'/> ";
      speakOutput += "Let me know how I can help you.";

      try {
        firebase.database().goOnline();
        function pad2(n) {
          return n < 10 ? "0" + n : n;
        }
        let current = new Date();
        let fulldate =
          current.getFullYear().toString() +
          pad2(current.getMonth() + 1) +
          pad2(current.getDate()) +
          pad2(current.getHours()) +
          pad2(current.getMinutes()) +
          pad2(current.getSeconds());
        let date = current.toLocaleDateString().split("/").join("_");
        let time = current.toLocaleTimeString();
        await database.ref("/Alexa/" + phoneNumber + "/" + fulldate).set({
          // "/Alexa/userID/date/time" <- both Alexa's respond & userVUI goes into the same path
          VALUE: speakOutput.split("<break time='1s'/>").join(" "), // what alexa is saying
          TIME: time,
          DATE: date,
          SPEAKER: "help",
        });
        firebase.database().goOffline();
        return handlerInput.responseBuilder
          .speak(speakOutput)
          .reprompt(speakOutput)
          .getResponse();
      } catch (error) {
        console.log('ERROR IN HELP INTENT HANDLER', error)
      }
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again. You can say "help" to hear what you can say';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        IngredientsIntentHandler,
        FridgeIntentHandler,
        SavedRecipeIntentHandler,
        RecipeIntentHandler,
        FindRecipeIntentHandler,
        StartCookingIntentHandler,
        NextIntentHandler,
        MainIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
        // below request interceptor will log all requests coming through
    .addRequestInterceptors(function(handlerInput){
        console.log(`/n *****REQUEST*****\n ${JSON.stringify(handlerInput, null, 4)}`)
    })
        // below response interceptor will log all responses going out
    .addResponseInterceptors(function(request, response){
        console.log(`\n *****RESPONSE*****\n ${JSON.stringify(response, null, 4)}`)
    })
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();```