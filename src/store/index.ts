import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ingredientReducer from "./ingredientSlice";
import recipeReducer from "./recipeSlice";
import chatlogReducer from "./chatlogSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientReducer,
    recipe: recipeReducer,
    chatlog: chatlogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
