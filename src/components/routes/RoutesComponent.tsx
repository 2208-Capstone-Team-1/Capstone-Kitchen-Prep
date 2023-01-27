import React from "react";
import { Routes, Route } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import RecipePage from "../Recipe/Recipe";
import UserPage from "../User/User";
import Ingredient from "../Ingredients/Ingredient";
import Login from "../Login";
import AboutPage from "../About";
import Home from "../Home/Home";
import SavedRecipes from "../savedRecipes/SavedRecipes";
import UserEdit from "../User/UserEdit";
import Recipes from "../fridge/Recipes";
import "../main.css";

const RoutesComponent = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {user.id && (
          <>
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/userEdit" element={<UserEdit />} />
          </>
        )}
        <Route path="/randomRecipe" element={<RecipePage />} />
        <Route path="/ingredient" element={<Ingredient user={user} />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/savedRecipe" element={<SavedRecipes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default RoutesComponent;
