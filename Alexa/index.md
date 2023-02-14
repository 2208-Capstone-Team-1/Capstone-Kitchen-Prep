/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const axios = require('axios');
// const https = require('https');

// async function getUserInfo(accessToken){
//     return new Promise((resolve, reject) => {
//         const options = {
//             "method": "GET",
//             "hostname": "api.amazon.com",
//             "path": "/user/profile",
//             "header": {
//                 "Authorization": `Bearer ${accessToken}`
//             }
//         };
//         let req = https.request(options, (response) => {
//             let returnData = "";
//             response.on('data', (chunk)=>{
//                 returnData += chunk;
//             });
            
//             response.on('end', ()=>{
//                 resolve(JSON.parse(returnData));
//             });
            
//             response.on("error",  (err) => {
//                 reject(err);
//             })
//         })
//         req.end();
//     })
// }

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    
    handle(handlerInput) {
        
        let speakOutput = `Welcome to Chef's Kiss. Let's get cooking. Tell me what you have in your fridge to start cooking <break time='0.5s'/>`;
        speakOutput += " or say 'help' to hear what you can say"

// below code is used to fetch access token of the linked user. Blocked out for now
        // const { accessToken } = handlerInput.requestEnvelope.session.user;
        // if(typeof accessToken !== "undefined"){
        //     const info = await getUserInfo(accessToken);
            
        //     console.log(`info: ${JSON.stringify(info)}`)
            
        //     const { name } = info;
        //     speakOutput = `Welcome to Chef's kiss, ${name}. Tell me what you have in your fridge to start cooking`
        // }else{
        //     speakOutput = `Welcome to Chef's Kiss. Let's get cooking. Tell me what you have in your fridge to start cooking`
        // }
        
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
    
    handle(handlerInput){
        /**
        *get the current session attributes, creating an object you can read and update
        */
        
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        // checks if we have an array called fridge. If not, create one
        if(!sessionAttributes.hasOwnProperty('fridge'))
        sessionAttributes.fridge = [];
        
        // takes in VUI & define as a slot ( ingredient )
        let ingredient = handlerInput.requestEnvelope.request.intent.slots.ingredient.value;
        let fridge = sessionAttributes.fridge;

        // get fridgeFiller function
        const fFunction = require('./fridge');
        
        // speakoutput will be left empty
        let speakOutput = "";
        
        // if the user's fridge is empty - assuming this is the user's first time using chef's kiss -, Alexa will give more detailed instruction
        if(fridge.length < 1 ){
            speakOutput = `I have added ${ingredient} to your fridge. You can say 'fridge' to check your ingredients anytime.`
            fridge.push(ingredient);
            // pushing ingredient into the fridge storage inside firdge.js
            fFunction.fridgeFiller(ingredient);
        }else{
            // if the user's fridge is not empty - meaning this is not their first time using the skill - it will simply add item to the fridge
            speakOutput = `I have added ${ingredient} to your fridge.`;
            // pushing ingredient into the fridge storage inside firdge.js
            fFunction.fridgeFiller(ingredient);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
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
    const ingredientLogic = require("./ingredientLogic.js");
    let response = await ingredientLogic.fetchIngredientApi(id);
    let storage = await response; //getting specific user's data & associated models
    let speakOutput = "You have ";

    //below code was used as a 'console.log' to see if axios if getting the correct data from our database
    // const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    // if(!sessionAttributes.hasOwnProperty('IDstorage'))
    // sessionAttributes.IDstorage = [];
    // let tester = sessionAttributes.IDstorage;
    // tester.push(storage);

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

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
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
    const ingredientLogic = require("./ingredientLogic.js");
    let response = await ingredientLogic.fetchIngredientApi(id);
    let storage = await response; //getting specific user's data & associated models
    let speakOutput = "Sure. Here's your saved recipes. <break time='0.5s'/>";

    let savedRecipe = storage.recipes;

    if (savedRecipe.length === 0) {
      speakOutput +=
        "Hmm. Looks like there's nothing saved here. If you want to hear what you can make with your ingredients, say 'recipe'";
    } else {
      speakOutput += "I found following recipes. <break time='0.3s'/>";
      for (let i = 0; i < savedRecipe.length; i++) {
        let recipe = savedRecipe[i].name;
        speakOutput += recipe +", " + "<break time='0.3s'/>";
      }
      speakOutput += ". Which recipe would you like to make today?";
    }

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
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
    const ingredientLogic = require("./ingredientLogic.js");
    let response = await ingredientLogic.fetchIngredientApi(id);
    let storage = await response; //getting specific user's data & associated models
    // let speakOutput = "Ok. Let's get started. <break time='0.5s'/>";

    let speakOutput = "Ok. Say 'start cooking' when you are ready";

    // grabbing user's saved recipe array
    let recipes = storage.recipes; //array of recipe objects
    let vuiRecipe = handlerInput.requestEnvelope.request.intent.slots.recipe.value; // what the user is saying to alexa
    
    // loops through recipes array to filter the object with matching recipe name
    let filteredRecipe = recipes.filter(
        (recipe) => recipe.name.toLowerCase() === vuiRecipe
        );
    let recipeUrl = filteredRecipe[0].url;
    let Edapi = "c36813915ba84ea2ab9c62461dc4d8b6"; // thanks Ed!
    let url = `https://api.spoonacular.com/recipes/extract?url=${recipeUrl}&apiKey=${Edapi}`

    const recipeLogic = require("./recipeLogic");
    let gettingRecipe = await recipeLogic.recipeFetcher(url);
    const recipe = await gettingRecipe;
    
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    // the recipe object will be pushed into recipeStorage
    // while the session is still on-going, this data will persist
    if(!sessionAttributes.hasOwnProperty('recipeStorage'))
    sessionAttributes.recipeStorage = [];
    let tester = sessionAttributes.recipeStorage;
    tester.push(recipe);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const StartCookingIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "StartCookingIntent"
    );
  },

  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    let recipeArr = sessionAttributes.recipeStorage;
    let instruction = recipeArr[0].analyzedInstructions[0].steps;
    
    let speakOutput = "";
    // this grabs the very first step of the cooking instruction
    // shifted array will be pushed into alexa's own 'useState' of sessionAttributes
    let step = instruction.shift();
    if(!sessionAttributes.hasOwnProperty('recipeSteps'))
    sessionAttributes.recipeSteps = instruction; 
    speakOutput += step.step;
    speakOutput += "<break time='0.3s'/> Say 'next' when you are ready.";
    

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

// when users says 'next' that VUI will trigger below handler
const NextIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.NextIntent"
    );
  },

  handle(handlerInput) {
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

    handle(handlerInput) {
        let speakOutput = ""
        speakOutput += "Sure. Here's some things you can say. You can say 'Fridge' to check your items, <break time='1s'/>";
        speakOutput += "You can say 'add items' to add more ingredients to your fridge. <break time='1s'/>' ";
        speakOutput += "You can also say 'saved recipe' to check your saved recipes. <break time='1s'/> ";
        speakOutput += "Let me know how I can help you."

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
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
        StartCookingIntentHandler,
        NextIntentHandler,
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
    .lambda();