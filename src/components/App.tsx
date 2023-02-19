import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { setUser, resetUser } from "../store/userSlice";
import { RootState } from "../store";
import RoutesComponent from "./routes/RoutesComponent";
import "./main.css";
import Footer from "./Footer/Footer";

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);
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

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <div>
      <div className="body">
        
        

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

        <div className="main_topbar">
          
          <div className="main_ptag">
            {!user.id ? (
              <Link to="/login">
                <button id= "login" className="slide">Login</button>
              </Link>
            ) : (
              user.id && (
                <>
                  <Link to="/user"><button id="account" className="slide">Account</button></Link>
                  <button id="login" className="slide" onClick={logout}>Logout</button>
                  </>
              )
            )}
          </div>
        </div>
        

        <div>
          <nav className="navbar">
            <Link to="/" id="page">Home</Link>
            <Link to="/about" id="page">About</Link>
            <Link to="/randomRecipe" id="page">Recipe of the Day </Link>
            {/*only logged-in user can view below tabs */}
            {user.id && (
              <>
                <Link to="/savedRecipe" id="page">Saved Recipes</Link>    
                <Link to="/userFridge" id="page">Fridge</Link>
                <Link to="/recipesFromIngredients" id="page">
                  Recipes From Ingredients
                </Link>
                <Link to="/groupChat" id="page">Group Chat</Link>
                <Link to="/alexaChat" id="page">Alexa Chat</Link>
              </>
            )}
            {user.isAdmin && <Link to="/admin" id="page">Admin</Link>}
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
