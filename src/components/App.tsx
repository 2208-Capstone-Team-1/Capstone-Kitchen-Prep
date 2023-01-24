import { useEffect } from "react";
import Home from "./Home/Home";
import Login from "./Login";
import { setUser, resetUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import { RootState } from "../store";
import UserPage from "./User/User";
import RecipePage from "./Recipe/Recipe";
import IngredientPage from "./Ingredient";
import "./main.css";
import AboutPage from "./About";
import SavedRecipePage from "./SavedRecipe";
import SavedRecipes from "./savedRecipes/SavedRecipes";
import { Button } from "@mui/material";
import UserEdit from "./User/UserEdit";

const App = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

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
            {!user.id && (
              <Button component={Link} to="/login" variant="contained">
                Login
              </Button>
            )}
            {user.id && (
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            )}
          </p>
        </div>
        <div className="main_logoPlace">
          <img id="logo"
            src="/static/Chef's kiss_logo.png"
            alt="chef's kiss logo"
            width="120"
            height="150"
          ></img>
          <a className = "mainLogoTxt" href="#"><span></span>Chef's Kiss</a>
          {/*<h1 className="mainLogoTxt">Chef's Kiss</h1>*/}
          
          <img id="logo"
            src="/static/Chef's kiss_logo.png"
            alt="chef's kiss logo"
            width="120"
            height="150"
          ></img>
        </div>
        <div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {/*only logged-in user can view below tabs */}
            {user.id && (
              <>
              <Link to="/user">Account</Link>
              <Link to="/ingredient">Fridge</Link>
              </>
              )}
            <Link to="/recipe">Recipe of the Day </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            {user.id && (
              <>
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/userEdit" element={<UserEdit />} />
            </>)}
            <Route path="/recipe" element={<RecipePage />} />
            <Route path="/ingredient" element={<IngredientPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/savedRecipe" element={<SavedRecipePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
