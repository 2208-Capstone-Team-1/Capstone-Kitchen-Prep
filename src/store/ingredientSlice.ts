import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface ingredientsType {
  ingredientsArray: Array<string>;
}

interface initialStateType {
  // wildcard: allows us to use something that's not specified
  [x: string]: any;
  ingredients: ingredientsType;
}

const initialState: initialStateType = {
  ingredients: {
    ingredientsArray: [],
  },
};

export const ingredientSlice = createSlice({
  name: "ingredientsArray",
  initialState,
  reducers: {
    // specify what we expect to take in
    setIngredients: (state, action) => {
      state.ingredientsArray = action.payload;
    },
    // specify what we expect to take in
    addIngredient: (state, action) => {
      state.ingredientsArray = [...state.ingredientsArray, action.payload];
    },
    // specify what we expect to take in
    clearIngredients: (state, action) => {
      state.ingredientsArray = [];
    },
  },
});

export const { setIngredients, addIngredient, clearIngredients } =
  ingredientSlice.actions;
export default ingredientSlice.reducer;
