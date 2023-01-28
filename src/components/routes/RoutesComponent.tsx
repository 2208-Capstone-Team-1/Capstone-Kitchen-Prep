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
import "../main.css";
import UserCreate from "../User/UserCreate";

const RoutesComponent = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randomRecipe" element={<RecipePage />} />
        <Route path="/ingredient" element={<Ingredient user={user} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/savedRecipe" element={<SavedRecipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<UserCreate />} />
        {user.id && (
          <>
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/userEdit" element={<UserEdit />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default RoutesComponent;
