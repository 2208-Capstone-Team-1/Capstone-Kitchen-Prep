import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { setUser, resetUser } from "../store/userSlice";
import { RootState } from "../store";
import RoutesComponent from "./routes/RoutesComponent";
import "./main.css";

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
            {!user.id ? (
              <Link to="/login">
                <Button variant="contained">
                  Login
                </Button>
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
            src="/static/Chef's kiss_logo.png"
            alt="chef's kiss logo"
            width="120"
            height="150"
          ></img>
          <Link to="#" className="mainLogoTxt">
            <span></span>Chef's Kiss
          </Link>
          {/*<h1 className="mainLogoTxt">Chef's Kiss</h1>*/}


          <img
            id="logo"
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
            <Link to="/randomRecipe">Recipe of the Day </Link>
            {/*only logged-in user can view below tabs */}
            {user.id && (
              <>
                <Link to="/user">Account</Link>
                <Link to="/savedRecipe">Saved Recipes</Link>
                <Link to="/ingredient">Fridge</Link>
              </>
            )}
            {user.isAdmin && <Link to="/admin">Admin</Link>}
          </nav>
          <RoutesComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
