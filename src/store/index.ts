import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recipeReducer from "./recipeSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
    recipe: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
