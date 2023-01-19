import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface ingredientsType {
  id: string;
  ingredientsArray: Array<string>;
}

interface initialStateType {
  [x: string]: any;
  ingredients: ingredientsType;
}

const initialState: initialStateType = {
  ingredients: {
    id: "",
    ingredientsArray: [],
  },
};

export const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    clearIngredients: (state, action) => {
      state.ingredients = [];
    },
  },
});
