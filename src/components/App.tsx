import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Button } from "@mui/material";
import axios from "axios";
import { setUser, resetUser } from "../store/userSlice";
import { RootState } from "../store";
import RoutesComponent from "./routes/RoutesComponent";
import "./main.css";

firebase.initializeApp({
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "chefs-kiss-d30f4.firebaseapp.com",
  projectId: "chefs-kiss-d30f4",
  storageBucket: "chefs-kiss-d30f4.appspot.com",
  messagingSenderId: "376445935624",
  appId: "1:376445935624:web:1cd185df98d8d51beaf1bd",
  measurementId: "G-3T0TQJQNJH",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
}

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [userFire] = useAuthState(auth);

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

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <div>
      <div className="body">
        <div className="main_topbar">
          <p className="main_ptag">place holder</p>
          <p className="main_ptag">
            {!user.id ? (
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>
            ) : (
              user.id && (
                <Button variant="contained" onClick={logout}>
                  Logout
                </Button>
              )
            )}
          </p>
        </div>
        <div className="main_logoPlace">
          <img
            id="logo"
            src="/static/ChefsKissLogo.png"
            alt="chef's kiss logo"
            width="120"
            height="150"
          ></img>
          <a className="mainLogoTxt" href="/">
            <span></span>Chef's Kiss
          </a>
          {/*<h1 className="mainLogoTxt">Chef's Kiss</h1>*/}

          <img
            id="logo"
            src="/static/ChefsKissLogo.png"
            alt="chef's kiss logo"
            width="120"
            height="150"
          ></img>
        </div>
        <div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/randomRecipe">Recipe of the Day </Link>
            {/*only logged-in user can view below tabs */}
            {user.id && (
              <>
                <Link to="/user">Account</Link>
                <Link to="/savedRecipe">Saved Recipes</Link>
                <Link to="/userFridge">Fridge</Link>
              </>
            )}
            {user.isAdmin && <Link to="/admin">Admin</Link>}
          </nav>
          <RoutesComponent />
        </div>
      </div>
      <section>{userFire ? <Chatroom /> : <loginWithToken />}</section>
    </div>
  );
};

export default App;
