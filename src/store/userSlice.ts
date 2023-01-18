import { createSlice } from "@reduxjs/toolkit";

interface userType {
  id: string;
  username: string;
}

interface initialStateType {
  [x: string]: any;
  user: userType;
}

const initialState: initialStateType = {
  user: {
    id: "",
    username: "",
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
        username: "",
      };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
