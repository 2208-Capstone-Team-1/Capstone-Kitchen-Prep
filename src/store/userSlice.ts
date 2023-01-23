import { createSlice } from "@reduxjs/toolkit";

interface userType {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface initialStateType {
  [x: string]: any;
  user: userType;
}

const initialState: initialStateType = {
  user: {
    id: "",
    email: "",
    isAdmin:false,
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
        isAdmin:false,
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;