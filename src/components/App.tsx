import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import { setUser } from "../store/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import { RootState } from "../store";
import UserPage from "./User";
import RecipePage from "./Recipe";
import IngredientPage from "./Ingredient";

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

  useEffect(() => {
    loginWithToken();
  }, []);

  // remove login requirement for now, will implement later
  // if (!user.id) return <Login />;
  return (
    <div>
      <h1>Kicthen Helper</h1>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/User">Account</Link>
          <Link to="/Recipe">Recipe of the Day </Link>
          <Link to="/Ingredient">Fridge</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/User" element={<UserPage />} />
          <Route path="/Recipe" element={<RecipePage />} />
          <Route path="/Ingredient" element={<IngredientPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
