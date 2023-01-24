import { createSlice } from "@reduxjs/toolkit";

export interface userType {
  id: string;
  email: string;
}

interface initialStateType {
  [x: string]: any;
  user: userType;
}

const initialState: initialStateType = {
  user: {
    id: "",
    email: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = {
        id: "",
        email: "",
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
