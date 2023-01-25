import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { setUser, resetUser } from "../store/userSlice";
import { RootState } from "../store";
import RecipePage from "./Recipe/Recipe";
import UserPage from "./User/User";
import Ingredient from "./Ingredients/Ingredient";
import Login from "./Login";
import AboutPage from "./About";
import Home from "./Home/Home";
import "./main.css";
import SavedRecipes from "./savedRecipes/SavedRecipes";
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
          <img
            src="/static/Chef's kiss_logo.jpg"
            alt="chef's kiss logo"
            width="100"
            height="130"
          ></img>
          <h1 className="mainLogoTxt">Chef's Kiss</h1>
        </div>
        <div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {/*only logged-in user can view below tabs */}
            {user.id && (
              <>
              <Link to="/user">Account</Link>
              <Link to="/savedRecipe">Saved Recipes</Link>
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
            <Route path="/ingredient" element={<Ingredient user={user} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/savedRecipe" element={<SavedRecipes />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
