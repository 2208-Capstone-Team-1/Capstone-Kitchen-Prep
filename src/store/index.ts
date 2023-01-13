import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
