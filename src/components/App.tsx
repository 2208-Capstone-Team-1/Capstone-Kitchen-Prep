import React, { useEffect } from "react";
import Home from "./Home/Home";
import Login from "./Login";
import { setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { RootState } from "../store";
import UserPage from "./User";
import RecipePage from "./Recipe/Recipe";
import IngredientPage from "./Ingredient";
import "./main.css";
import AboutPage from "./About";
import SavedRecipePage from "./SavedRecipe";

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      dispatch(setUser(response.data));
      console.log("navigated!");
    }
    navigate("/User");
    console.log("Navigate to home");
  };

  useEffect(() => {
    loginWithToken();
  }, []);

  // remove login requirement for now, will implement later
  // if (!user.id) return <Login />;
  return (
    <div>
      <h1>CHEF'S KISS</h1>
      <img
        src="/static/Chef's kiss_logo.jpg"
        alt="chef's kiss logo"
        width="100"
        height="130"
      ></img>
    <div className="body">
      <div className="main_topbar">
        <p className="main_ptag">place holder</p>
        <p className="main_ptag">Login</p>
        </div>
      <div className="main_logoPlace">
        <h1 className="mainLogoTxt">Chef's Kiss</h1>
      </div>
      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/user">Account</Link>
          <Link to="/recipe">Recipe of the Day </Link>
          <Link to="/ingredient">Fridge</Link>
          <Link to="/about">About</Link>
          
          
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/ingredient" element={<IngredientPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/savedRecipe" element={<SavedRecipePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
