import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { setUser, resetUser } from "../store/userSlice";
import { RootState } from "../store";
import RoutesComponent from "./routes/RoutesComponent";
import { onValue, ref, getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import { addIngredient } from "./../store/ingredientSlice";
import { setChatlogs, setAddChatlog } from "./../store/chatlogSlice";
import "./main.css";
import Footer from "./Footer/Footer";
import AlexaChat from "./Firebase/AlexaChat";

//intialize firebase app
const app = firebase.initializeApp({
  apiKey: "AIzaSyACYBhS0y2OHMoflq0g0TRdQiiArnfrrYE",
  authDomain: "chefs-kiss-d30f4.firebaseapp.com",
  projectId: "chefs-kiss-d30f4",
  storageBucket: "chefs-kiss-d30f4.appspot.com",
  messagingSenderId: "376445935624",
  appId: "1:376445935624:web:1cd185df98d8d51beaf1bd",
  measurementId: "G-3T0TQJQNJH",
  database: "https://chefs-kiss-d30f4-default-rtdb.firebaseio.com",
});

const database = getDatabase(app);
//defining what the chatlog type will be
interface chatlogType {
  DATE: string;
  SPEAKER: string;
  TIME: string;
  VALUE: string;
}

interface IngredientInterface {
  name: string;
  image: string;
}

const App = () => {
  //redux state
  const { user } = useSelector((state: RootState) => state.user);
  const { chatlogs } = useSelector((state: RootState) => state.chatlog);

  const dispatch = useDispatch();
  //authorization for firebase
  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    dispatch(resetUser());
  };

  //getChatlog function
  const getChatlog = async () => {
    const query = ref(database, "Alexa/" + user.phoneNumber);
    return onValue(query, (snapshot) => {
      //snapshot.val() takes a snapshot of the firebase database and stores in the alexaData variable
      const alexaData = snapshot.val();
      //initiate empty array
      let alexaDataArr = [];
      // push the values in the object into an array because it needs to be iterable
      if (snapshot.exists()) {
        for (const alexaInput in alexaData) {
          alexaDataArr.push(alexaData[alexaInput]);
        }
        dispatch(setChatlogs(alexaDataArr));
        if (alexaDataArr.length > 0) {
          // take last value in the array
          const chatCopy = [...alexaDataArr];
          const lastChat = chatCopy.pop();
          // check if the key: TYPE exists, if yes, we'll take the SPEAKER and call the api to add it to the database
          if (lastChat.TYPE === "ingredient") {
            let newIngredient: IngredientInterface = lastChat.SPEAKER;
            addIngredientSubFunction(newIngredient);
          }
        }
      }
      console.log("alexaDataArr ", alexaDataArr);
    });
  };

  const addIngredientSubFunction = async (
    newIngredient: IngredientInterface
  ) => {
    const addNewIngredient = await axios.post(
      `/api/users/${user.id}/ingredients`,
      {
        name: newIngredient,
        image: `https://spoonacular.com/cdn/ingredients_100x100/${newIngredient}.jpg`,
      }
    );
    // dispatch new ingredients to the UI
    dispatch(addIngredient(addNewIngredient));
  };

  useEffect(() => {
    loginWithToken();
    getChatlog();
  }, [user.id]);

  useEffect(() => {
    getChatlog();
  }, []);

  return (
    <div>
      <div className="body">
        <div className="main_topbar">
          <div className="main_ptag">
            {!user.id ? (
              <Link to="/login">
                <button id="login" className="slide">
                  Login
                </button>
              </Link>
            ) : (
              user.id && (
                <>
                  <Link to="/user">
                    <button id="account" className="slide">
                      Account
                    </button>
                  </Link>
                  <button id="login" className="slide" onClick={logout}>
                    Logout
                  </button>
                </>
              )
            )}
          </div>
        </div>

        <div className="main_logoPlace">
          <img
            id="logo"
            src="/static/ChefsKissLogo.png"
            alt="chef's kiss logo"
            width="70"
            height="90"
          ></img>
          <a className="mainLogoTxt" href="/">
            <span></span>Chef's Kiss
          </a>
          <img
            id="logo"
            src="/static/ChefsKissLogo.png"
            alt="chef's kiss logo"
            width="70"
            height="90"
          ></img>
        </div>

        <div>
          <nav className="navbar">
            {/* <Link to="/" id="page">Home</Link> */}
            <Link to="/about" id="page">
              About
            </Link>
            <Link to="/randomRecipe" id="page">
              Recipe of the Day{" "}
            </Link>
            {/*only logged-in user can view below tabs */}
            {user.id && (
              <>
                <Link to="/savedRecipe" id="page">
                  Saved Recipes
                </Link>
                <Link to="/userFridge" id="page">
                  Fridge
                </Link>
                <Link to="/recipesFromIngredients" id="page">
                  Recipes From Ingredients
                </Link>
                <Link to="/groupChat" id="page">
                  Group Chat
                </Link>
                <Link to="/alexaChat" id="page">
                  Alexa Chat
                </Link>
              </>
            )}
            {user.isAdmin && (
              <Link to="/admin" id="page">
                Admin
              </Link>
            )}
          </nav>
        </div>
        <RoutesComponent />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
